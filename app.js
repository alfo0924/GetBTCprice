var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/sqlite.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

app.get('/api/quotes', (req, res) => {
    db.all('SELECT * FROM BTCUSD', (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        res.json(rows);
    });
});


const express = require('express');
const app = express();

// Sample data
const backendData = [
    { date: '2024-05-01', value: 'Data 1' },
    { date: '2024-05-05', value: 'Data 2' },
    { date: '2024-05-10', value: 'Data 3' }
];

// Search endpoint
app.get('/search', (req, res) => {
    const { startDate, endDate } = req.query;

    // Filter data between startDate and endDate
    const filteredData = backendData.filter(item =>
        item.date >= startDate && item.date <= endDate
    );

    res.json(filteredData);
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
