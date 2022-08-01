 // Verifica a Umidade
 function verificaUmidade(newUmidade, oldUmidade){
    
    const umidadeRange = 10;

    console.log("newUmidade: " + newUmidade);
    console.log("oldUmidade: " + oldUmidade);

    if ( (newUmidade > oldUmidade + umidadeRange) ){
        return "Umidade está alta!";
    }
    else if ( newUmidade < oldUmidade - umidadeRange){
        return "Umidade está baixo!";
    }
    else{
        return "Umidade está ok!";
    }
}

// Verifica temperatura
function verificaTemperatura(newTemp, oldTemp){

    const tempRange = 10;

    console.log("newTemp: " + newTemp);
    console.log("oldTemp: " + oldTemp);

    if ( (newTemp > oldTemp + tempRange) ){
        return "Temperatura está alta!";
    }
    else if ( newTemp < oldTemp - tempRange){
        return "Temperatura está baixo!";
    }
    else{
        return "Temperatura está ok!";
    }
}

// Verifica Higrometro
function verificaHigrometro(newHigrometro, oldHigrometro){

    const higrometroRange = 10;

    console.log("newHigrometro: " + newHigrometro);
    console.log("oldHigrometro: " + oldHigrometro);

    if ( (newHigrometro > oldHigrometro + higrometroRange) ){
        return "A terra está muito molhada!";
    }
    else if ( newHigrometro < oldHigrometro - higrometroRange){
        return {
            "mensagem": "A terra está seca, o motor será ligado!",
            "timer": "10"
        }
    }
    else{
        return "A terra está ok!";
    }


}

module.exports = {verificaUmidade, verificaTemperatura, verificaHigrometro}