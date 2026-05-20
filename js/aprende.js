window.addEventListener("DOMContentLoaded", () => {
    // 1. Cargar datos del alumno desde el localStorage
    const nombreGuardado = localStorage.getItem("nombre");
    const avatarGuardado = localStorage.getItem("avatarUsuario");

    if (nombreGuardado) {
        document.getElementById("nombreUsuario").textContent = nombreGuardado;
    } else {
        document.getElementById("nombreUsuario").textContent = "Invitado";
    }

    if (avatarGuardado) {
        document.getElementById("avatarUsuario").src = avatarGuardado;
    } else {
        const avatarEl = document.getElementById("avatarUsuario");
        if (avatarEl) avatarEl.alt = "Sin avatar";
    }

    // 2. Comando de voz automático al entrar: "Empecemos la actividad"
    setTimeout(() => {
        hablar("¡Empecemos la actividad!");
    }, 600);

    // 3. Inicializar el sistema interactivo de arrastrar y soltar
    inicializarDragAndDrop();
});

// Función global de voz
function hablar(texto) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel(); // Limpia cualquier voz en cola
    
    let hablarUtterance = new SpeechSynthesisUtterance(texto);
    hablarUtterance.lang = "es-ES";
    hablarUtterance.rate = 0.9; // Velocidad pausada para niños
    window.speechSynthesis.speak(hablarUtterance);
}

// Acción del botón parlante
function reproducirInstrucciones() {
    hablar("Debes deslizar los números a su casilla correspondiente.");
}

// Lógica de Arrastrar y soltar
function inicializarDragAndDrop() {
    const arrastrables = document.querySelectorAll('.numero-arrastrable');
    const destinos = document.querySelectorAll('.destino');
    const contenedorOpciones = document.getElementById('contenedor-opciones');

    arrastrables.forEach(elemento => {
        // Al empezar a arrastrar dice el número correspondiente
        elemento.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
            hablar(e.target.dataset.val);
        });

        // Al hacer clic o tocar también dice el número
        elemento.addEventListener('click', (e) => {
            hablar(e.target.dataset.val);
        });
    });

    destinos.forEach(destino => {
        destino.addEventListener('dragover', (e) => e.preventDefault());

        destino.addEventListener('drop', (e) => {
            e.preventDefault();
            const idElemento = e.dataTransfer.getData('text');
            const elementoArrastrado = document.getElementById(idElemento);
            
            if (elementoArrastrado && destino.children.length === 0) {
                destino.appendChild(elementoArrastrado);
                // Vuelve a confirmar el número al colocarlo en la casilla
                hablar(elementoArrastrado.dataset.val);
            }
        });
    });

    // Permitir devolver los números a la caja de abajo
    if (contenedorOpciones) {
        contenedorOpciones.addEventListener('dragover', (e) => e.preventDefault());
        contenedorOpciones.addEventListener('drop', (e) => {
            e.preventDefault();
            const idElemento = e.dataTransfer.getData('text');
            const elementoArrastrado = document.getElementById(idElemento);
            if (elementoArrastrado) {
                contenedorOpciones.appendChild(elementoArrastrado);
            }
        });
    }
}

// Validación de la actividad al presionar el botón
function validarActividad() {
    let aciertos = 0;
    const casillasDestino = ['target-2', 'target-4', 'target-5'];
    const divMensaje = document.getElementById('mensaje');

    casillasDestino.forEach(id => {
        const casilla = document.getElementById(id);
        const numeroCorrecto = casilla.dataset.numero;
        
        // Comprobar si la casilla contiene el número esperado
        if (casilla.firstElementChild && casilla.firstElementChild.dataset.val === numeroCorrecto) {
            aciertos++;
        }
    });

    if (aciertos === 3) {
        divMensaje.className = "correcto";
        divMensaje.innerText = "¡Excelente! Lo hiciste increíble. 🎉";
        hablar("¡Excelente! Lo hiciste increíble.");
    } else {
        divMensaje.className = "incorrecto";
        divMensaje.innerText = "¡Oh, casi! Revisa bien los números e inténtalo de nuevo. 💪";
        hablar("¡Oh, casi! Revisa bien los números e inténtalo de nuevo.");
    }
}