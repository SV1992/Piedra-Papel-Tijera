// Configuración para prevenir repeticiones de teclas
let configTeclado = { prevent_repeat: true };
let eventoTeclado = new window.keypress.Listener(this, configTeclado);

// Definición de las opciones del juego
const PIEDRA = "piedra";
const PAPEL = "papel";
const TIGERA = "tigera";

// Definición de resultados posibles
const EMPATE = 0;
const GANASTE = 1;
const PERDISTE = 2;

// Variable para controlar si se está jugando actualmente
let JUGANDO = false;

// Elementos HTML
const piedraBtn = document.getElementById("piedra");
const papelBtn = document.getElementById("papel");
const tigeraBtn = document.getElementById("tigera");
const resultadoTexto = document.getElementById("texto_inicial");
const imagen = document.getElementById("imagen");
const maquina = document.getElementById("maquina_imagen");

// Manejadores de eventos para los botones click
// piedraBtn.addEventListener("click", () => {
//     JUGAR(PIEDRA);
// });
// papelBtn.addEventListener("click", () => {
//     JUGAR(PAPEL);
// });
// tigeraBtn.addEventListener("click", () => {
//     JUGAR(TIGERA);
// });

// Manejadores de eventos para las combinaciones de teclas (a, s, d)
(() => {
    eventoTeclado.simple_combo("a", () => {
        JUGAR(PIEDRA);
    });
    eventoTeclado.simple_combo("s", () => {
        JUGAR(PAPEL);
    });
    eventoTeclado.simple_combo("d", () => {
        JUGAR(TIGERA);
    });
})();

// Función principal para jugar el juego
function JUGAR(opcion) {
    if (JUGANDO) return;

    JUGANDO = true;

    imagen.src = "img/" + opcion + ".svg";

    resultadoTexto.innerHTML = "Espera un Momento!";

    // Establece un intervalo para cambiar la opción de la máquina cada 200 ms
    const intervalo = setInterval(function () {
        const opcion_maquina = calcOpcionMaquina();
        maquina.src = "img/" + opcion_maquina + ".svg";
    }, 200);

    // Después de 2 segundos, detiene el intervalo y calcula el resultado
    setTimeout(function () {
        clearInterval(intervalo);

        const opcion_maquina = calcOpcionMaquina();
        const result = calcResult(opcion, opcion_maquina);

        maquina.src = "img/" + opcion_maquina + ".svg";

        // Muestra el resultado en el elemento de texto
        switch (result) {
            case EMPATE:
                resultadoTexto.innerHTML = "Empate !";
                break;
            case GANASTE:
                resultadoTexto.innerHTML = "Ganaste !";
                break;
            case PERDISTE:
                resultadoTexto.innerHTML = "Perdiste !";
                break;
        }

        JUGANDO = false;
    }, 2000);
}

// Función para calcular la opción de la máquina al azar
function calcOpcionMaquina() {
    const number = Math.floor(Math.random() * 3);
    switch (number) {
        case 0:
            return PIEDRA;
        case 1:
            return PAPEL;
        case 2:
            return TIGERA;
    }
}

// Función para calcular el resultado del juego
function calcResult(opcion, opcion_maquina) {
    if (opcion === opcion_maquina) {
        return EMPATE;
    } else if (opcion === PIEDRA) {
        if (opcion_maquina === PAPEL) return PERDISTE;
        if (opcion_maquina === TIGERA) return GANASTE;
    } else if (opcion === PAPEL) {
        if (opcion_maquina === TIGERA) return PERDISTE;
        if (opcion_maquina === PIEDRA) return GANASTE;
    } else if (opcion === TIGERA) {
        if (opcion_maquina === PIEDRA) return PERDISTE;
        if (opcion_maquina === PAPEL) return GANASTE;
    }
}
