require('dotenv').config();
const express = require('express');
const cors = require("cors");
const pilotoRoutes = require('./modules/piloto/piloto.routes');
const pessoaRoutes = require('./modules/pessoa/pessoa.routes');
const carroRoutes = require('./modules/carro/carro.routes');
const corridaRoutes = require('./modules/corrida/corrida.routes');
const inscricoesRoutes = require('./modules/inscricoes/inscricoes.routes');
const pistaRoutes = require('./modules/pista/pista.routes');
const equipeRoutes = require('./modules/equipe/equipe.routes');
const authRoutes = require('./modules/auth/auth.routes');


const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(pilotoRoutes);
app.use(pessoaRoutes);
app.use(carroRoutes);
app.use(corridaRoutes);
app.use(inscricoesRoutes);
app.use(pistaRoutes);
app.use(equipeRoutes);

const mapErrosStatus = {
    P2025:{
        status: 404,
        message: "Registro não foi encontrado"
    },
    P2003:{
        status: 409,
        message: "Houve conflito ao realizar a ação"
    },
}

app.use((err, req, res, next) =>{
    if(err.status){
        return next(err);
    }
    const encontrado = mapErrosStatus[err.code];
    if(encontrado){
        err.status = encontrado.status;
        err.message = encontrado.message;
    }
    next(err);
})

app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    res.status(status).json({error: err.message || 'Erro interno'});
});

module.exports = app;