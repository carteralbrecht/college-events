const express = require('express');
const app = express();

const path = require('path')


const routes = require('./routes');

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('client/build'));

app.use('/api', routes);

// If no API routes are hit, send the React app
app.use(function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}.`);
});