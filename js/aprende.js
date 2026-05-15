window.onload = function() {
    // Voz inicial automática
    let inicial = new SpeechSynthesisUtterance("4 círculos más 3 círculos es igual a 7 círculos");
    inicial.lang = "es-ES";
    window.speechSynthesis.speak(inicial);
};

function contar(cantidad) {
    let mensaje = new SpeechSynthesisUtterance(cantidad + " círculos");
    mensaje.lang = "es-ES";
    window.speechSynthesis.speak(mensaje);
}
