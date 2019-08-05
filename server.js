const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const multer = require('multer');
const favicon = require('serve-favicon');

const indexController = require('./controllers/index');
const scheduleController = require('./controllers/schedule');
const periodController = require('./controllers/period');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/schedule', express.static('uploads'));
app.use(favicon(__dirname + '/public/favicon.ico'));

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

app.get('/', indexController);
app.get('/create', scheduleController.showCreatePage);
app.post('/create', upload.array('image'), scheduleController.createSchedule);
app.post('/schedule', scheduleController.postAuthSchedule);
app.get('/schedule/calendar/:id', periodController.printSchedule);
app.get('/schedule/:id', periodController.detailSchedule);
app.get('/auth/:id', scheduleController.getAuthSchedule);
app.post('/detail', periodController.createPeriod);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@node-rest-shop-zqnku.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
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