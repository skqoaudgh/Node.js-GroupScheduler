const Schedule = require('../models/schedule');
const Period = require('../models/period');

module.exports = {
    detailSchedule: async (req, res, next) => {
        const result = await Schedule.findById(req.params.id);
        const period = [[]];
        res.render('detail.ejs', {schedule: result, period: period, scheduleId: req.params.id});
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
    }
}