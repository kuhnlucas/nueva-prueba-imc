//FUNCIONES

// Función para calcular el IMC
 function calcularImc(peso, altura) {
    return peso / ((altura / 100) **2);
 }


// Función para validar peso y altura dentro de rangos válidos
function validarPesoAltura(peso, altura) {
    return (isNaN(peso) || isNaN(altura) || peso <= 35 || peso >= 300 ||altura <= 140 ||altura >= 230); 
}



// Función para registrar un nuevo peso
function registrarPeso(mes, peso) {
    // Validar el mes
    if (!mesesValidos.includes(mes.toUpperCase())) {
        return alert("Mes no válido. Ingrese un mes entre 1 y 12.");
    }

    // Validar el peso
    if (isNaN(peso) || peso <= 0) {
        return alert("Peso no válido. Ingrese un peso mayor a 0.");
    }

    // Registrar el peso
    registrosImc.push({ mes, peso });

    // Actualizar estadísticas
    categoriasMesesDePesaje[mes] = (categoriasMesesDePesaje[mes] || 0) + peso;
    categoriasPesajes[mes] = (categoriasPesajes[mes] || 0) + 1;
}

// Función para calcular el total de pesajes
function calcularTotalPesajes() {
    return registrosImc.reduce((acc, { peso }) => acc + peso, 0).toFixed(2);
}

// Función para calcular el promedio de peso
function calcularPromedioDePeso() {
    return (calcularTotalPesajes() / registrosImc.length).toFixed(2);
}

// Funcion para calcular el peso mas alto
function calcularPesoMasAlto() {
    // Obtener solo los pesos del array registrosImc
    const pesos = registrosImc.map(({ peso }) => peso);
    
    // Verificar si hay registros de peso
    if (pesos.length === 0) {
        return "No hay registros de peso.";
    }
    
    // Calcular el peso máximo
    const pesoMasAlto = Math.max(...pesos).toFixed(2);
    
    return pesoMasAlto;
}

//Funcion para calcular peso mas bajo
function calcularPesoMasBajo() {
    // Obtener solo los pesos del array registrosImc
    const pesos = registrosImc.map(({ peso }) => peso);
    
    // Verificar si hay registros de peso
    if (pesos.length === 0) {
        return "No hay registros de peso.";
    }
    
    // Calcular el peso mínimo
    const pesoMasBajo = Math.min(...pesos).toFixed(2);
    
    return pesoMasBajo;
}

//CONSTANTES

// Lista de meses válidos
const mesesValidos = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];

// VARIABLES
let registrosImc = [];
let categoriasMesesDePesaje = {};
let categoriasPesajes = {};

//CICLOS

// Ciclo principal
let continuar = true;
while (continuar) {
    let peso = parseFloat(prompt("Ingrese su peso en kg:"));
    let altura = parseFloat(prompt("Ingrese su altura en centímetros:"));
    
     // Convertir altura a metros
    if (validarPesoAltura(peso, altura)) {
        alert("Por favor, ingrese valores válidos.");
        continue;
        }
    
    /*if (isNaN(peso) || isNaN(altura) || peso <= 35 || peso >= 300 ||altura <= 140 ||altura >= 230) {
        alert("Por favor, ingrese valores válidos.");
    }*/ 
    else {
        
        calcularImc (peso, altura); 

        let resultado = calcularImc(peso, altura);
        console.log("Tu IMC es: " + resultado);

        if (resultado < 18.5) {
            alert("Insuficiencia Ponderal.");
        } else if (resultado >= 18.5 && resultado <= 24.9) {
            alert("Peso Normal.");
        } else if (resultado >= 25 && resultado <= 29.9) {
            alert("Sobrepeso.");
        } else if (resultado >= 30 && resultado <= 34.9) {
            alert("Obesidad tipo I.");
        } else if (resultado >= 35 && resultado <= 39.9) {
            alert("Obesidad tipo II.");
        } else {
            alert("Obesidad tipo III (mórbida)");
        }
    } 
    // Registrar peso y mes
    
    let continuarRegistro = true;
    do {
        let mes = prompt("Ingrese el mes (Ej: Enero):").toUpperCase();
        let pesoMes = parseFloat(prompt("Ingrese el peso que desea registrar:"));

        if (mesesValidos.includes(mes) && !isNaN(pesoMes) && pesoMes > 0) {
            registrarPeso(mes, pesoMes);
        } else {
            alert("Por favor, ingrese valores válidos para el mes y el peso.");
            continue;
        }

        let respuesta = prompt("¿Desea registrar otro peso ? (s/n)");
        if (respuesta.toLowerCase() !== "s") {
            continuarRegistro = false;
        }
    } while (continuarRegistro);

    let respuesta = prompt("¿Desea calcular otro IMC? (s/n)");
    if (respuesta.toLowerCase() !== "s") {
        break;
    };
};

//ESTADISTICAS
console.log("Pesajes mensuales: ", registrosImc);
console.log("Total de pesajes en el mes: ", calcularTotalPesajes());
console.log("Promedio de peso: ", calcularPromedioDePeso());
console.log("Pesajes por mes: ", categoriasPesajes);
console.log("Pesajes de cada mes: ", categoriasMesesDePesaje);
console.log("Peso mas alto: ", calcularPesoMasAlto());
console.log("Peso mas bajo: ", calcularPesoMasBajo());

alert("Gracias por usar CalculatorIMCpro.");