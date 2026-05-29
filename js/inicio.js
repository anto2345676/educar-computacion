window.addEventListener("DOMContentLoaded", () => {
    // Forzamos una limpieza de síntesis al cargar la página por seguridad
    window.speechSynthesis.cancel();

    const nombreGuardado = localStorage.getItem("nombre");
    const avatarGuardado = localStorage.getItem("avatarUsuario");

    const txtNombre = document.getElementById("nombreUsuario");
    const imgAvatar = document.getElementById("avatarUsuario");

    if (txtNombre) {
        txtNombre.textContent = nombreGuardado ? nombreGuardado : "Invitado";
    }

    if (imgAvatar) {
        if (avatarGuardado) {
            imgAvatar.src = avatarGuardado;
            imgAvatar.style.display = "block"; 
        } else {
            imgAvatar.alt = "Sin avatar seleccionado";
        }
    }
});

function mensajeVoz() {
    window.speechSynthesis.cancel(); // Detener cualquier residuo de voz
    
    let texto = "¡Excelente! Continuemos con las actividades";
    let hablar = new SpeechSynthesisUtterance(texto);
    hablar.lang = "es-ES"; 
    hablar.volume = 1;      
    hablar.rate = 1;       
    hablar.pitch = 1.2;   

    // SÓLO cuando termine de hablar la frase del botón "Seguir", cambiará a aprende.html
    hablar.onend = function() {
        window.location.href = "aprende.html"; 
    };

    window.speechSynthesis.speak(hablar);
}