const Schedule = require('../models/schedule');

async function getSchedules() {
    try {
        let resultA = await Schedule.find({ EndPeriod: {$lt: new Date()} }).sort({ StartPeriod: 1 });
        let resultB = await Schedule.find({ EndPeriod: {$gte: new Date()} }).sort({ StartPeriod: 1 });
        return resultB.concat(resultA);
    }
    catch(err) {
        throw new err;
    }
}

module.exports = async (req, res, next) => {
    try {
        const schedule = await getSchedules();
        const create = req.flash('create');
        const code = req.flash('code');
        const error = req.flash('error');
        req.session.destroy();
        res.render('index.ejs', {schedule: schedule, create: create, code: code, error: error});
    }
    catch(err) {
        console.log(err);
        req.flash('error', 'true');
        res.redirect('/');
    }
};