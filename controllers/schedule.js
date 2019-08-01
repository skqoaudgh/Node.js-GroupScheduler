const Schedule = require('../models/schedule');
const period = require('./period');

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
            
        let images = [];
        req.files.forEach(element => {
            images.push(element.filename);
        });

        const code = Math.floor(Math.random() * 90000) + 10000;
        let schedule = new Schedule({
            Creator: req.body.name,
            Title: req.body.title,
            StartPeriod: req.body.periodStart,
            EndPeriod: req.body.periodEnd,
            Comment: req.body.comment,
            Image: images,
            AuthCode: code
        });
        await schedule.save();
        req.session.create = true;
        req.session.code = code;
        res.redirect('/');
    },

    getAuthSchedule: async (req, res, next) => {
        try {
            req.session.auth = false;
            const result = await Schedule.findById(req.params.id, 'AuthCode');
            res.render('auth.ejs', {authCode: result.AuthCode, scheduleId: req.params.id, isFail: false});
        }
        catch(err) {
            console.error(err);
        }
    },

    postAuthSchedule: async (req, res, next) => {
        const inputCode = req.body.inputCode;
        const authCode = req.body.authCode;
        const scheduleId = req.body.scheduleId;
        if(inputCode == authCode) {
            const scheduleResult = await Schedule.findById(req.body.scheduleId);
            req.session.schedule = scheduleResult;
            req.session.auth = true;
            res.redirect('/schedule/' + scheduleId);
        }
        else {
            res.render('auth.ejs', {authCode: authCode, scheduleId: scheduleId, isFail: true});
        }
    }
}