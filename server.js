const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const createController = require('./controllers/create');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({  // 2
    secret: 'we all like cats',
    resave: false,
    saveUninitialized: true
}));

app.get('/', async (req, res, next) => {
    const schedule = await createController.getSchedules();
    const create = req.session.create;
    req.session.destroy();
    res.render('index.ejs', {schedule: schedule, create: create});
});

app.get('/create', (req, res, next) => {
    res.render('create.ejs');
});

app.post('/create', createController.createSchedule);

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
