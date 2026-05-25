window.addEventListener("DOMContentLoaded", () => {
    // 1. Cargar datos del estudiante (guardados previamente en index.html)
    const nombreGuardado = localStorage.getItem("nombre");
    const avatarGuardado = localStorage.getItem("avatarUsuario");

    const txtNombre = document.getElementById("nombreUsuario");
    const imgAvatar = document.getElementById("avatarUsuario");

    if (txtNombre) {
        txtNombre.textContent = nombreGuardado ? nombreGuardado : "Invitado";
    }

    if (imgAvatar && avatarGuardado) {
        imgAvatar.src = avatarGuardado;
    }

    // 2. Dar bienvenida por voz al entrar a la pantalla avanzada
    setTimeout(() => {
        hablar("¡Genial! Ahora conozcamos los números del 6 al 10. Haz clic en cada uno para escuchar su nombre.");
    }, 500);

    // 3. Asignar los eventos de clic a las figuras de números
    const figuras = document.querySelectorAll(".numero-figura");
    figuras.forEach(figura => {
        figura.addEventListener("click", () => {
            const numeroASonara = figura.getAttribute("data-numero");
            hablar(numeroASonara);
        });
    });
});

// Función del motor de audio (TTS)
function hablar(texto) {
    if (!('speechSynthesis' in window)) return;
    
    // Cancela cualquier locución que esté sonando para evitar superposiciones
    window.speechSynthesis.cancel(); 
    
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = "es-ES"; // Español estándar
    utterance.rate = 0.85;    // Velocidad lenta y clara ideal para niños
    utterance.pitch = 1.1;     // Tono ligeramente amigable
    
    window.speechSynthesis.speak(utterance);
}

// Función del botón Siguiente
function irAlJuego() {
    // Te redirige al juego de arrastrar del 6 al 10 que creamos antes
    window.location.href = "juego2.html"; 
}