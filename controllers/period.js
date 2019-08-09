const mongoose = require('mongoose');
const Schedule = require('../models/schedule');
const Period = require('../models/period');

Date.prototype.convertDateFormat = function() {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();

    return [this.getFullYear(),
            (mm>9 ? '' : '0') + mm,
            (dd>9 ? '' : '0') + dd
           ].join('-');
};

function mergeDate(arrayDate, inputDate) {
    let adjustedPeriod = [];
    if(inputDate.flag == true) {
        if(arrayDate[0] < inputDate.start) {
            let leftDate = new Date(inputDate.start);
            leftDate.setDate(leftDate.getDate()-1);
            adjustedPeriod.push({
                period: [arrayDate[0], leftDate.toISOString()],
                creator: inputDate.creator
            });
        }
        if(arrayDate[1] > inputDate.end) {
            let rightDate = new Date(inputDate.end);
            rightDate.setDate(rightDate.getDate()+1);
            adjustedPeriod.push({
                period: [rightDate.toISOString(), arrayDate[1]],
                creator: inputDate.creator
            });
        }
    }
    else {
        adjustedPeriod = {
            period: [inputDate.start, inputDate.end],
            creator: inputDate.creator
        };
    }
    return adjustedPeriod;
}

module.exports = {
    detailSchedule: async (req, res, next) => {
        const create = req.flash('create');
        const auth = req.session.auth;
        if(auth == req.params.id) {
            try {
                const scheduleResult = await Schedule.findById(req.params.id);
                req.session.schedule = scheduleResult;
                res.render('detail.ejs', {schedule: scheduleResult, scheduleId: req.params.id, create: create, share: null});
            }
            catch(err) {
                console.error(err);
            }
        }
        else {
            res.redirect('/auth/' + req.params.id);
        }
    },

    createPeriod: async (req, res ,next) => {
        const flag = (req.body.periodFlag == 'ok') ? true : false;
        let period = new Period({
            Creator: req.body.name,
            Schedule: req.body.scheduleId,
            StartPeriod: new Date(req.body.startYear, req.body.startMonth-1, req.body.startDay),
            EndPeriod: new Date(req.body.endYear, req.body.endMonth-1, req.body.endDay),
            isAvailablePeriod: flag
        });
        await period.save();
        req.flash('create', 'true');
        res.redirect('/schedule/' + req.body.scheduleId);      
    },

    printSchedule: async (req, res, next) => {
        if(req.session.schedule == null) {
            res.redirect('/');
        }
        else {
            if(mongoose.Types.ObjectId.isValid(req.params.id)) {
                const periodResults = await Period.find({Schedule:req.params.id});
                if(periodResults != null) {
                    let period = [];
                    periodResults.forEach(periodResult => {
                        const inputPeriod = {
                            start: periodResult.StartPeriod.toISOString(),
                            end: periodResult.EndPeriod.toISOString(),
                            flag: periodResult.isAvailablePeriod,
                            creator: periodResult.Creator
                        };
                        period = period.concat(mergeDate([req.session.schedule.StartPeriod, req.session.schedule.EndPeriod], inputPeriod));
                    });
                    res.render('calendar.ejs', {schedule: req.session.schedule, userPeriod: period});
                }
                else {
                    res.redirect('/');
                }
            }
            else {
                res.redirect('/');
            }
        }
    }
}