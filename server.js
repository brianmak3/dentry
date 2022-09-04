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
    const { values, selectedTeam } = req.body
    manipulateSheet('create', values, selectedTeam).then(data => {
        manipulateSheet('get', null, selectedTeam).then(data => {
            res.status(201).json(data)
        })
    })
})
app.get('/', (req, res) => {
    console.log(req.params)
    manipulateSheet('get').then(data => {
        res.status(201).json(data.slice(1))
    })
})
app.get('/sheets', (req, res) => {
    manipulateSheet('getSheets').then(data => {
        res.status(201).json(data.map(a => a.properties.title))
    })
})

http.listen(port, () => {
    console.log('App running  on port ' + port)
    manipulateSheet('getSheets')
})





