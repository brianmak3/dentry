const {   manipulateSheet } = require('./src/utils');

const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    port = 4000,
    bodyParser = require('body-parser'),
    cors = require('cors');
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.post('/', (req, res) => {
    console.log(req.body)
})

http.listen(port, () => {
    console.log('App running  on port ' + port)
    manipulateSheet('create', ['ak','bc','cd']).then(resp=>console.log(resp)).catch(e=>console.log(e))
})




