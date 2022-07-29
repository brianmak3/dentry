const { default: axios } = require('axios');
const { manipulateSheet } = require('./src/utils');

const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    port = process.env.PORT || 4000,
    bodyParser = require('body-parser'),
    cors = require('cors');
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.post('/', (req, res) => {
    manipulateSheet('create', req.body).then(data => {
        manipulateSheet('get').then(data => {
            res.status(201).json(data)
        })
    })
})
app.get('/', (req, res) => {
    manipulateSheet('get').then(data => {
        res.status(201).json(data.slice(1))
    })
})

http.listen(port, () => {
    console.log('App running  on port ' + port)
})





