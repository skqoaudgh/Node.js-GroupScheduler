const Schedule = require('../models/schedule');

function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}

module.exports = {
    getSchedules: async () => {
        try {
            let result = await Schedule.find();
            return result;
        }
        catch(err) {
            console.error(err);
        }
    },

    createSchedule: async (req, res, next) => {
        if(req.body.image == '') 
            req.body.image = null;
            
        let schedule = new Schedule({
            Creator: req.body.name,
            Title: req.body.title,
            StartPeriod: req.body.periodStart,
            EndPeriod: req.body.periodEnd,
            Comment: req.body.comment,
            Image: req.body.image,
            Color: getRandomColor()
        });
        await schedule.save();
        req.session.create = true;
        res.redirect('/');
    },

    detailSchedule: async (req, res, next) => {
        let result = await Schedule.findById(req.params.id);
        res.render('detail.ejs', {schedule: result});
    }
}