// 📌 Evento principal
window.addEventListener("DOMContentLoaded", async () => {
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
        if (avatarEl) avatarEl.alt = "Sin avatar seleccionado";
    }

    // Cargamos voces al inicio
    await inicializarVoces();
    inicializarNumeros();
    inicializarBotonSiguiente();
});

// 📌 CARGAR VOCES: Versión optimizada
function inicializarVoces() {
    return new Promise((resolve) => {
        const voces = window.speechSynthesis.getVoices();
        if (voces.length > 0) {
            resolve(voces);
            return;
        }

        // Si no están listas, escuchamos el evento
        window.speechSynthesis.onvoiceschanged = () => {
            resolve(window.speechSynthesis.getVoices());
        };

        // Respaldo por si onvoiceschanged no se dispara (Chrome/Safari viejo)
        setTimeout(() => {
            resolve(window.speechSynthesis.getVoices());
        }, 500);
    });
}

// 📌 BUSCA VOZ EN ESPAÑOL
function obtenerVozEspanol() {
    const voces = window.speechSynthesis.getVoices();
    return voces.find(voz => voz.lang.startsWith('es')) 
        || voces.find(voz => voz.name.toLowerCase().includes('spanish') || voz.name.toLowerCase().includes('español'));
}

// ✅ MENSAJE DEL BOTÓN SIGUIENTE (Ahora acepta un Callback para saber cuándo termina)
function mensajeVoz(onTerminado) { 
    if (!('speechSynthesis' in window)) {
        alert('Tu navegador no soporta voz');
        if (onTerminado) onTerminado();
        return;
    }

    // Cancelamos cualquier audio previo que pueda estar colgado
    window.speechSynthesis.cancel();

    let texto = "¡Excelente! Continuemos con las actividades";
    let hablar = new SpeechSynthesisUtterance(texto);
    hablar.lang = "es-ES";
    hablar.volume = 1;
    hablar.rate = 0.9; 
    hablar.pitch = 1; 

    const vozElegida = obtenerVozEspanol();
    if (vozElegida) hablar.voice = vozElegida;

    // 🔥 ESTO ES CLAVE: Ejecuta la acción SOLO cuando termine de hablar
    hablar.onend = () => {
        if (onTerminado) onTerminado();
    };

    // En caso de error, que no se quede trabada la app
    hablar.onerror = () => {
        if (onTerminado) onTerminado();
    };

    window.speechSynthesis.speak(hablar);
}

// ✅ FUNCIÓN PRINCIPAL: DECIR NÚMERO
function hablarNumero(numero) {
    if (!('speechSynthesis' in window)) {
        alert('Tu navegador no soporta voz');
        return;
    }

    window.speechSynthesis.cancel(); // Limpia colas previas inmediatamente

    const mensaje = new SpeechSynthesisUtterance(`El número es ${numero}`);
    mensaje.lang = 'es-ES';
    mensaje.rate = 0.9; 
    mensaje.volume = 1;

    const vozElegida = obtenerVozEspanol();
    if (vozElegida) mensaje.voice = vozElegida;

    window.speechSynthesis.speak(mensaje);
}

// ACTIVAR CLIC EN NÚMEROS
function inicializarNumeros() {
    const figurasNumeros = document.querySelectorAll('.numero-figura');

    if (figurasNumeros.length === 0) {
        console.warn('No hay elementos con la clase .numero-figura');
        return;
    }

    figurasNumeros.forEach(figura => {
        figura.removeEventListener('click', manejarClic);
        figura.addEventListener('click', manejarClic);
    });
}

function manejarClic() {
    const numero = this.getAttribute('data-numero');
    if (numero) {
        hablarNumero(numero);
    }
}

// BOTÓN SIGUIENTE REESTRUCTURADO
function inicializarBotonSiguiente() {
    const btnSiguiente1 = document.getElementById('btnSiguiente1');
    const pantalla1 = document.getElementById('pantalla1');
    const pantalla2 = document.getElementById('pantalla2');

    if (!btnSiguiente1 || !pantalla1 || !pantalla2) {
        console.warn('Faltan elementos en el HTML');
        return;
    }

    btnSiguiente1.addEventListener('click', () => {
        pantalla1.classList.remove('activa');
        pantalla2.classList.add('activa');
        
        // 1. Abrimos la ventana inmediatamente (requiere interacción directa del clic)
        window.open('ventana_nueva.html', '_blank', 'width=500,height=400,top=100,left=100');

        // 2. Ejecutamos la voz y pasamos la redirección como el "Callback" (lo que hará al terminar)
        mensajeVoz(() => {
            window.location.href = "aprende.html";
        });
    });
}