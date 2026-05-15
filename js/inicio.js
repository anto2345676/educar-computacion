// Cargar y mostrar los datos guardados
window.addEventListener("DOMContentLoaded", () => {
    const nombreGuardado = localStorage.getItem("nombre");
    const avatarGuardado = localStorage.getItem("avatarUsuario");

    if (nombreGuardado) {
        document.getElementById("nombreUsuario").textContent = nombreGuardado;
    }

    if (avatarGuardado) {
        document.getElementById("avatarUsuario").src = avatarGuardado;
    }

    // Voz automática al entrar
    setTimeout(() => {
        let bienvenida = new SpeechSynthesisUtterance("Bienvenido " + (nombreGuardado || "amigo"));
        bienvenida.lang = "es-ES";
        window.speechSynthesis.speak(bienvenida);
    }, 500);
});

function mensajeVoz() {
    let texto = "¡Excelente! Continuemos con las actividades";
    let hablar = new SpeechSynthesisUtterance(texto);
    hablar.lang = "es-ES";
    
    window.speechSynthesis.speak(hablar);

    // Esperar un poco a que termine de hablar antes de cambiar de página
    setTimeout(() => {
        window.location.href = "aprende.html";
    }, 2000);
}
    
