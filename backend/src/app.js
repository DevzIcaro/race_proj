require('dotenv').config();
const express = require('express');
// [corrigido] era `const cors = ("cors")` -- faltava o require de verdade,
// então "cors" virava a string literal "cors", e cors() explodia (não é função).
const cors = require("cors");

const pilotoRoutes = require('./modules/piloto/piloto.routes');
const pessoaRoutes = require('./modules/pessoa/pessoa.routes');
const carroRoutes = require('./modules/carro/carro.routes');
const corridaRoutes = require('./modules/corrida/corrida.routes');
const inscricoesRoutes = require('./modules/inscricoes/inscricoes.routes');
const pistaRoutes = require('./modules/pista/pista.routes');
const equipeRoutes = require('./modules/equipe/equipe.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use(pilotoRoutes);
app.use(pessoaRoutes);
app.use(carroRoutes);
app.use(corridaRoutes);
app.use(inscricoesRoutes);
app.use(pistaRoutes);
app.use(equipeRoutes);

// [corrigido] parâmetros estavam como (err, res, req, next) -- res e req
// trocados de posição. Express identifica middleware de erro pela ORDEM dos
// 4 parâmetros, não pelo nome, então "res.status(...)" ia rodar em cima do
// req de verdade.
app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({error: err.message || 'Erro interno'});
});

module.exports = app;