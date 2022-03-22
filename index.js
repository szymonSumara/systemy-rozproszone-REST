const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json())
app.use(require('./routes/game'));
app.use(express.static('static'))

app.listen(3000, () => {
    console.log("Start listen on port http://localhost:3000")
})