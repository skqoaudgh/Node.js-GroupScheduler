const Schedule = require('../models/schedule');

async function shareSchedule(longUrl) {
    const { BitlyClient } = require('bitly');
    const bitly = new BitlyClient(process.env.BITLY_API_KEY, {});

    let result;
    try {
        result = await bitly.shorten(longUrl);
    } 
    catch (err) {
        throw err;
    }
    return result.url;
}

module.exports = {
    showCreatePage: (req, res, next) => {
        req.session.auth = false;
        req.session.create = false;
        res.render('create.ejs');
    },

    createSchedule: async (req, res, next) => {
        if(req.body.image == '') 
            req.body.image = null;
            
        let images = [];
        req.files.forEach(element => {
            images.push(element.filename);
        });

        let schedule = new Schedule();

        const code = Math.floor(Math.random() * 90000) + 10000;
        const host = (req.get('host')=='localhost:3000')?('lvh.me:3000'):(req.get('host'));
        const longUrl = req.protocol + '://' + host + '/schedule/' + schedule.id;
        
        schedule.Creator = req.body.name;
        schedule.Title = req.body.title;
        schedule.StartPeriod = req.body.periodStart;
        schedule.EndPeriod = req.body.periodEnd;
        schedule.Comment = req.body.comment;
        schedule.Image = images;
        schedule.AuthCode = code;
        schedule.ShareURL = await shareSchedule(longUrl);

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