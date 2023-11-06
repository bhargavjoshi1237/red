const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
 let page = req.query.page;
 fetch("https://caring-fawn-44928.upstash.io/get/"+page, {
      headers: {
        Authorization: "Bearer Aa-AASQgNTkwY2Q2NjAtN2FjZC00MzdhLWI4ZDQtZDQwMmQxOGJjODNjZTA0YjkzZDU1MDIyNDQyNDliN2QwNjE5NWQxOTI1NDA="
      }
    }).then(response => response.json())
      .then(data => res.json(data.result)); 
 
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
