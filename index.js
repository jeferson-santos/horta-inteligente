const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./db");
const processa = require("./processa.js");

// Heroku
const cool = require('cool-ascii-faces');

app.use(cors())
app.use(express.json())

// Plantas disponiveis para monitoramento
const planta = db.retornaPlantaAtual();

// Variaveis dos sensores
var sensors = new Map();
sensors.set("umidade", "0");
sensors.set("temperatura", "0");
sensors.set("higrometro", "0");

// Variavel de tempo do motor
var motorTimer = "0";

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

// Heroku
app.get('/cool', (req, res) => res.send(cool()))

// Pega os tipos de plantas disponiveis
app.get('/getPlants', (req, res) => {
    const plants = db.retornaPlantas();
    res.setHeader('Content-Type', 'application/json');
    res.json(plants);
});

// Pega a planta atual configurada
app.get('/getPlant', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(planta);
});


// Pega os dados atuais dos sensores do Wemus
app.get('/getData', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({ 
        "umidade": sensors.get("umidade"),
        "temperatura": sensors.get("temperatura"),
        "higrometro": sensors.get("higrometro")
    });
});

// Registra o tipo de planta que será monitorado
app.post('/postPlant', (req, res) => {
    console.log(req.body);
    db.alteraPlantaAtual(req.body.plant);
    res.send("Planta alterada com sucesso!");
});

// Registra os dados atuais dos sensores do Wemus 
app.post('/postData', (req, res) => {
    console.log(req.body);

    // Verifica se os valores recebidos dos sensores são tipo Inteiro, caso contrário retorna erro.
    if ( isNumber(req.body.umidade) && isNumber(req.body.temperatura) && isNumber(req.body.higrometro) ){

        // Registra os valores recebidos no map de sensores
        sensors.set("umidade", req.body.umidade);
        sensors.set("temperatura", req.body.temperatura);
        sensors.set("higrometro", req.body.higrometro);

       // Verifica umidade
       const umidade = processa.verificaUmidade(parseInt(sensors.get("umidade")), parseInt(planta.umidade));
       console.log(umidade);

       // Verifica temperatura
       const temperatura = processa.verificaTemperatura(parseInt(sensors.get("temperatura")), parseInt(planta.temperatura));
       console.log(temperatura);
       
       // Verifica higrometro
       const higrometro = processa.verificaHigrometro(parseInt(sensors.get("higrometro")), parseInt(planta.higrometro));
       console.log("Mensagem: " + higrometro.mensagem);
       console.log("Tempo de ativação do motor: " + higrometro.timer + " segundos.");

       motorTimer = higrometro.timer;
       
       res.setHeader('Content-Type', 'application/json');
       res.json({ "motorTimer": motorTimer });
       return res;
    }

    res.send("Valores incorretos!");
});

const port = 5000;
app.listen(port, ()=>{
    console.log("Rodando servidor Express.");
});





