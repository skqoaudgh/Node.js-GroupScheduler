const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res, next) => {
    res.render('index.ejs');
});

app.get('/create', (req, res, next) => {
    res.render('create.ejs');
});

app.listen(3000, () => {
    console.log('express server is opened on port 3000.'); 
});