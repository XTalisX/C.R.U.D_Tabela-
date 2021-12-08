const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const rotaCaminhoes = require('./routes/caminhoes');

app.use(bodyParser.urlencoded({extended: false})); // Apenas dados simples
app.use(bodyParser.json()); // json de entrada no body

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});

app.use('/caminhoes', rotaCaminhoes);

// Quando não encontra rota, entra aqui:
app.use((req, res, next) => {
    const error = new Error('Não encontrado.');
    error.status = 404;
    next(error);
});

app.use((req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        error: {
            mensagem: error.mensagem
        }
    });
});

module.exports = app;