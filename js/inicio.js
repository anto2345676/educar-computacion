// Cargar y mostrar los datos guardados
window.addEventListener("DOMContentLoaded", () => {
    const nombreGuardado = localStorage.getItem("nombre");
    const avatarGuardado = localStorage.getItem("avatarUsuario");

    if (nombreGuardado) {
        document.getElementById("nombre").textContent = nombreGuardado;
    } else {
        document.getElementById("nombreUsuario").textContent = "Invitado";
    }

    if (avatarGuardado) {
        document.getElementById("avatarUsuario").src = avatarGuardado;
    } else {
        document.getElementById("avatarUsuario").alt = "Sin avatar seleccionado";
    }
});
function mensajeVoz() {
    // Texto que se va a decir
    let texto = "¡Excelente! Continuemos con las actividades";

//  FUNCIÓN NUEVA: Mensaje de voz
function mensajeVoz() {
    // Texto que se va a decir
    let texto = "¡Excelente! Continuemos con las actividades";
    
    // Crear objeto de síntesis de voz
    let hablar = new SpeechSynthesisUtterance();
    hablar.text = texto;
    hablar.lang = "es-ES"; // Idioma: Español
    hablar.volume = 1;     // Volumen (0 a 1)
    hablar.rate = 1;      // Velocidad (1 = normal)
    hablar.pitch = 1.2;   // Tono de voz (más alto o más grave)

    // Ejecutar la voz
    window.speechSynthesis.speak(hablar);
}}
setTimeout(() => {

        window.location.href = "aprende.html";

    }, 2000);