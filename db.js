const fs = require("fs");
filePath = './plants.json';
encoding = 'utf-8';

// Retorna todas as plantas disponiveis
function retornaPlantas(){
    console.log("retornaPlantas()");
    try {
        const data = fs.readFileSync(filePath, encoding);
        const plants = JSON.parse(data);
        return plants;
    } catch (e){
        console.log(e);
    }    
}

// Retorna a Planta atual configurada
function retornaPlantaAtual(){
    console.log("retornaPlantaAtual()");
    const plantas = retornaPlantas();

    for (var planta in plantas){
        if ( plantas[planta].active ){
            console.log("Planta ativa: " + planta);
            return plantas[planta];
        }
    }
}

// Reconfigura/Altera a planta atual
function alteraPlantaAtual(newPlant){
    console.log("alteraPlantAtual");

    const plantas = retornaPlantas();
    
    for (var planta in plantas){
        if ( planta == newPlant ){
            console.log("Planta ativa: " + planta);
            plantas[planta].active = true;
        }else{
            plantas[planta].active = false;
        }
    }

    const newDataString = JSON.stringify(plantas, null, 2);
    fs.writeFileSync(filePath, newDataString, encoding);
    return;
}

module.exports = {alteraPlantaAtual, retornaPlantas, retornaPlantaAtual}