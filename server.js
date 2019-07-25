const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const multer = require('multer');
const path = require('path');

const scheduleController = require('./controllers/schedule');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/schedule', express.static('uploads'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({  // 2
    secret: 'we all like cats',
    resave: false,
    saveUninitialized: true
}));

const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            const filename = new Date().valueOf() + file.originalname;
            cb(null, filename);
        }
    })
});

app.get('/', async (req, res, next) => {
    const schedule = await scheduleController.getSchedules();
    const create = req.session.create;
    req.session.destroy();
    res.render('index.ejs', {schedule: schedule, create: create});
});

app.get('/create', (req, res, next) => {
    res.render('create.ejs');
});
app.post('/create', upload.array('image'), scheduleController.createSchedule);
app.get('/schedule/:id', scheduleController.detailSchedule);

mongoose.connect(`mongodb+srv://${'Cada'}:${'asd123'}@node-rest-shop-zqnku.mongodb.net/${'GroupScheduler'}?retryWrites=true&w=majority`, {
    useNewUrlParser: true
})
.then(() => {
    app.listen(3000, () => {
        console.log('express server is opened on port 3000.');
    });
})
.catch((err) => {
    console.error(err);
})

Date.prototype.yyyymmdd = function() {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();
  
    return [this.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd].join('');
};