const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res, next) => {
    res.render('index.ejs');
});

app.get('/create', (req, res, next) => {
    res.render('create.ejs');
});

app.post('/create', (req, res ,next) => {
    console.log(req.body);
});

app.listen(3000, () => {
    console.log('express server is opened on port 3000.'); 
});