const Schedule = require('../models/schedule');

module.exports = {
    createSchedule: async (req, res, next) => {
        let schedule = new Schedule({
            Creator: req.body.name,
            Title: req.body.title,
            StartPeriod: req.body.periodStart,
            EndPeriod: req.body.periodEnd,
            Comment: req.body.comment,
            Image: req.body.image
        });
        await schedule.save();
        req.session.create = true;
        res.redirect('/');
    }
}