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
    
    const contenedorFrases = document.getElementById("frasesMotivacionales");
    const frasesMotivacionales = [
        '"La salud es la riqueza más grande."',
        '"Haz del ejercicio tu hábito diario."',
        '"El descanso adecuado es clave para un cuerpo y mente saludables."',
        '"Come bien, vive bien."',
        '"No se trata de tener tiempo, sino de priorizarlo."',
        '"Tu cuerpo es tu templo. Mantenlo puro y limpio para la alma que vive dentro de ti."',
        '"Cuida tu cuerpo. Es el único lugar que tienes para vivir."',
        '"Haz que cada día cuente."',
        '"El movimiento es vida."',
        '"La fuerza no proviene de lo que puedes hacer, sino de superar lo que creías que no podías."',
        '"El descanso es parte del entrenamiento."',
        '"Nunca es tarde para empezar a cuidar de ti mismo."',
        '"Cuida tu cuerpo como si fueras a vivir en él eternamente."',
        '"El equilibrio es la clave de una vida saludable."',
        '"El ejercicio no solo cambia tu cuerpo, también cambia tu mente, tu actitud y tu estado de ánimo."',
        '"Sueña en grande, comienza pequeño, actúa ahora."',
        '"La nutrición adecuada es la base para una vida saludable."',
        '"El mejor momento para cuidar de ti mismo fue ayer. El siguiente mejor momento es ahora."',
        '"No te rindas. El principio siempre es lo más difícil."',
        '"La felicidad es un estado de bienestar físico, mental y social."',
        '"Cada pequeño paso te acerca a grandes resultados."',
        '"La salud es un viaje, no un destino."',
        '"Haz de la actividad física tu medicina diaria."',
        '"Dormir lo suficiente es esencial para recargar tu cuerpo y mente."',
        '"Los cambios positivos comienzan con decisiones positivas."',
        '"Elige cuidarte a ti mismo todos los días."',
        '"La alimentación saludable es un acto de amor propio."',
        '"No te compares con los demás, compite contigo mismo."',
        '"La vida es lo que haces de ella. Mantén una actitud positiva y haz lo mejor con lo que tienes."',
        '"El ejercicio no solo alarga la vida, sino que la hace más feliz y placentera."',
        '"No se trata de ser perfecto, se trata de ser mejor que ayer."',
        '"La vida es un viaje. Disfruta del viaje mientras trabajas para alcanzar tus objetivos."',
        '"Tu cuerpo puede hacer cualquier cosa, es tu mente la que necesitas convencer."',
        '"La salud es la verdadera riqueza."',
        '"Cuida tus pensamientos, porque se convertirán en tus palabras. Cuida tus palabras, porque se convertirán en tus acciones. Cuida tus acciones, porque se convertirán en tus hábitos. Cuida tus hábitos, porque se convertirán en tu destino."',
        '"La determinación y el esfuerzo constante son la clave del éxito en cualquier objetivo de salud."',
        '"La alimentación saludable es la mejor medicina preventiva."',
        '"El dolor que sientes hoy será tu fuerza mañana."',
        '"Invierte en ti mismo. Es la mejor inversión que jamás harás."',
        '"La motivación es lo que te pone en marcha. El hábito es lo que te mantiene en marcha."',
        '"Nunca subestimes el poder de un pequeño cambio."',
        '"El bienestar físico es la base de una vida plena y feliz."',
        '"Tu cuerpo es un reflejo directo de tus elecciones de estilo de vida."',
        '"El bienestar mental es tan importante como el bienestar físico."',
        '"Cada paso que das te acerca a tus metas. No te detengas."',
        '"La perseverancia es la clave del éxito en cualquier aspecto de la vida."',
        '"La disciplina es el puente entre metas y logros."',
        '"La vida es un regalo. Aprecia cada momento."',
        '"Escucha a tu cuerpo. Te está hablando."'
    ];

    const intervalo = setInterval(function() {
        const indiceAleatorio = Math.floor(Math.random() * frasesMotivacionales.length);
        const fraseAleatoria = frasesMotivacionales[indiceAleatorio];
        contenedorFrases.textContent = fraseAleatoria;
    }, 50000);


    
});

