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
    for(let i=0; i<arrayDate.length; i++) {
        if(inputDate.flag == false) {
            if(arrayDate[i][0] < inputDate.start && arrayDate[i][1] >= inputDate.start) {
                if(arrayDate[i][1] <= inputDate.end) {
                    let date = new Date(inputDate.start);
                    date.setDate(date.getDate()-1);
                    arrayDate[i][1] = date.convertDateFormat();
                }
                else {
                    let date = new Date(inputDate.end);
                    date.setDate(date.getDate()+1);
                    arrayDate.push([date.convertDateFormat(), arrayDate[i][1]]);

                    date = new Date(inputDate.start);
                    date.setDate(date.getDate()-1);
                    arrayDate[i][1] = date.convertDateFormat();
                }
            }
            else if(arrayDate[i][0] >= inputDate.start) {
                if(arrayDate[i][1] <= inputDate.end) {
                    arrayDate.splice(i--, 1);
                }
                else {
                    let date = new Date(inputDate.end);
                    date.setDate(date.getDate()+1);
                    arrayDate[i][0] = date.convertDateFormat();
                }
            }
        }
        else {
            if(arrayDate[i][0] <= inputDate.start) {
                if(arrayDate[i][1] < inputDate.start) {
                    arrayDate.splice(i--, 1);
                }
                else if(arrayDate[i][1] <= inputDate.end) {
                    arrayDate[i][0] = inputDate.start;
                }
                else {
                    arrayDate[i][0] = inputDate.start;
                    arrayDate[i][1] = inputDate.end;
                }
            }
            else {
                if(arrayDate[i][0] > inputDate.end) {
                    arrayDate.splice(i--, 1);
                }
                else if(arrayDate[i][1] > inputDate.end) {
                    arrayDate[i][1] = inputDate.end;
                }   
            }
        }
    }
}

module.exports = {
    detailSchedule: async (req, res, next) => {
        const create = req.session.create;
        req.session.destroy();
        try {
            const periodResults = await Period.find({Schedule:req.params.id});
            const scheduleResult = await Schedule.findById(req.params.id);
            const InitialStart = new Date(scheduleResult.StartPeriod).convertDateFormat();
            const InitialEnd = new Date(scheduleResult.EndPeriod).convertDateFormat();
            let period = [[InitialStart, InitialEnd]];
            periodResults.forEach(periodResult => {
                mergeDate(period, {
                    start: periodResult.StartPeriod.convertDateFormat(),
                    end: periodResult.EndPeriod.convertDateFormat(),
                    flag: periodResult.isAvailablePeriod
                });
            });
            res.render('detail.ejs', {schedule: scheduleResult, period: period, scheduleId: req.params.id, create: create});
        }
        catch(err) {
            console.error(err);
        }
    },

    createPeriod: async (req, res ,next) => {
        const flag = (req.body.periodFlag == 'ok') ? true : false;
        let period = new Period({
            Creator: req.body.name,
            Schedule: req.body.scheduleId,
            StartPeriod: req.body.myStart,
            EndPeriod: req.body.myEnd,
            isAvailablePeriod: flag
        });
        await period.save();
        req.session.create = true;
        res.redirect('/schedule/' + req.body.scheduleId);      
    },

    printSchedule: (req, res, next) => {
        res.render('canlendar.ejs');
    }
}