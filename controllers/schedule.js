const mongoose = require('mongoose');
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
        req.session.auth = null;
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
        schedule.StartPeriod = new Date(req.body.startYear, req.body.startMonth-1, req.body.startDay);
        schedule.EndPeriod = new Date(req.body.endYear, req.body.endMonth-1, req.body.endDay);
        schedule.Comment = req.body.comment;
        schedule.Image = images;
        schedule.AuthCode = code;
        schedule.ShareURL = await shareSchedule(longUrl);

        await schedule.save();
        req.flash('create','true');
        req.flash('code', code);
        res.redirect('/');
    },

    getAuthSchedule: async (req, res, next) => {
        try {
            if(mongoose.Types.ObjectId.isValid(req.params.id)) {
                req.session.auth = null;
                const result = await Schedule.findById(req.params.id, 'AuthCode');
                if(result != null) {
                    res.render('auth.ejs', {authCode: result.AuthCode, scheduleId: req.params.id, isFail: false});
                }
                else {
                    req.flash('error', 'true');
                    res.redirect('/');
                }
            }
            else {
                req.flash('error', 'true');
                res.redirect('/');
            }
        }
        catch(err) {
            console.error(err);
            req.flash('error', 'true');
            res.redirect('/');
        }
    },

    postAuthSchedule: async (req, res, next) => {
        const inputCode = req.body.inputCode;
        const authCode = req.body.authCode;
        const scheduleId = req.body.scheduleId;
        if(inputCode == authCode) {
            req.session.auth = req.body.scheduleId;
            res.redirect('/schedule/' + scheduleId);
        }
        else {
            res.render('auth.ejs', {authCode: authCode, scheduleId: scheduleId, isFail: true});
        }
    }
}