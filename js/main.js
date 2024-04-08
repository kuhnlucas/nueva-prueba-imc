document.addEventListener("DOMContentLoaded", function() {
    // Array para almacenar los registros de mes y peso
    let registros = JSON.parse(localStorage.getItem("registros")) || [];

    // Función para validar peso y altura dentro de rangos válidos
    function validarPesoAltura(peso, altura) {
        return isNaN(peso) || isNaN(altura) || peso <= 40 || peso >= 250 || altura <= 140 || altura >= 230;
    }

    // Función para calcular el IMC
    function calcularImc(peso, altura) {
        const imc = peso / ((altura / 100) ** 2).toFixed(2);
        let suImc = "";
        let descripcion = "";

        if (imc < 18.5) {
            suImc = "Insuficiencia Ponderal";
            descripcion = "Por debajo del peso normal";
        } else if (imc >= 18.5 && imc <= 24.9) {
            suImc = "Peso Normal";
            descripcion = "Peso normal";
        } else if (imc >= 25 && imc <= 29.9) {
            suImc = "Sobrepeso";
            descripcion = "Por encima del peso normal";
        } else if (imc >= 30 && imc <= 34.9) {
            suImc = "Obesidad tipo I";
            descripcion = "Obesidad tipo I (Moderada)";
        } else if (imc >= 35 && imc <= 39.9) {
            suImc = "Obesidad tipo II";
            descripcion = "Obesidad tipo II (Severa)";
        } else {
            suImc = "Obesidad tipo III";
            descripcion = "Obesidad tipo III (Mórbida)";
        }

        return { imc, suImc, descripcion };
    }

    const formulario = document.getElementById("formulario");
    const pesoInput = document.getElementById("peso");
    const alturaInput = document.getElementById("altura");
    const infoDiv = document.getElementById("info");
    const valorSpan = document.getElementById("valor");
    const suImcSpan = document.getElementById("suImc");
    const descripcionSpan = document.getElementById("descripcion");
    const formNuevoRegistro = document.getElementById('formNuevoRegistro');
    const registrosContainer = document.getElementById('registrosContainer');

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        // Obtener valores de peso y altura
        const peso = parseFloat(pesoInput.value);
        const altura = parseFloat(alturaInput.value);

        // Validar peso y altura
        if (validarPesoAltura(peso, altura)) {
            alert("Por favor, ingrese valores válidos para el peso y la altura.");
            return;
        }

        // Calcular IMC
        const resultadoImc = calcularImc(peso, altura);
        mostrarResultado(resultadoImc);
    });

    function mostrarResultado(resultado) {
        infoDiv.classList.remove("hidden");
        valorSpan.textContent = resultado.imc.toFixed(2);
        suImcSpan.textContent = resultado.suImc;
        descripcionSpan.textContent = resultado.descripcion;
    }

    formNuevoRegistro.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener valores de mes y peso del formulario
        const mesRegistro = document.getElementById('mesRegistro').value;
        const pesoRegistro = parseFloat(document.getElementById('pesoRegistro').value);

        // Verificar si el peso está dentro del rango permitido
        if (pesoRegistro <= 40 || pesoRegistro >= 250) {
            alert('El peso debe estar entre 40 y 250 kg.');
            return;
        }

        // Verificar si el mes ingresado es válido
        const mesesValidos = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
        if (!mesesValidos.includes(mesRegistro.toLowerCase())) {
            alert('Por favor, ingrese un mes válido.');
            return;
        }

        // Llamar a la función para registrar el peso
        registrarMesYPeso(mesRegistro, pesoRegistro);
    });

    // Función para registrar el mes y peso
    const registrarMesYPeso = (mes, peso) => {
        // Verificar si ya existe un registro para este mes
        const mesExistente = registros.find(registro => registro.mes.toLowerCase() === mes.toLowerCase());

        // Si el mes ya existe, actualizar el peso
        if (mesExistente) {
            mesExistente.peso = peso;
        } else {
            // Si no existe, agregar un nuevo registro
            registros.push({
                mes: mes,
                peso: peso
            });
        }

        // Actualizar la lista de registros
        cargarRegistros();

        // Guardar los registros en el localStorage
        localStorage.setItem("registros", JSON.stringify(registros));

        // Limpiar los campos del formulario
        document.getElementById('mesRegistro').value = '';
        document.getElementById('pesoRegistro').value = '';
    }

    // Función para cargar los registros de mes y peso
    const cargarRegistros = () => {
        registrosContainer.innerHTML = "";
        registros.forEach((registro) => {
            let div = document.createElement("div");
            div.classList.add("registro");
            div.innerHTML = `
                <h3> ${registro.mes}</h3>
                <p> ${registro.peso} kg</p>
            `;

            registrosContainer.append(div);
        });
      
    }

});
