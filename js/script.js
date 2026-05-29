let avatarSeleccionado = null;

// Seleccionar avatar
function seleccionar(img) {
    let avatares = document.querySelectorAll('.avatares img');
    avatares.forEach(a => a.classList.remove('seleccionado'));

    img.classList.add('seleccionado');
    avatarSeleccionado = img.getAttribute("src");

    // Sonido click
    const audio = document.getElementById("audioAvatar");
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log("Audio bloqueado"));
    }

    // Voz avatar seleccionado
    window.speechSynthesis.cancel(); 
    let mensaje = new SpeechSynthesisUtterance("Avatar seleccionado");
    mensaje.lang = "es-ES";
    window.speechSynthesis.speak(mensaje);
}

// Botón ingresar
function ingresar() {
    let nombre = document.getElementById('nombre').value.trim();
    
    // Cancelamos cualquier audio previo para que la alerta sea inmediata
    window.speechSynthesis.cancel(); 

    // CASO 1: Falta nombre Y falta avatar
    if (nombre === "" && avatarSeleccionado === null) {
        let voz = new SpeechSynthesisUtterance("Debes escribir tu nombre y seleccionar un avatar");
        voz.lang = "es-ES";
        window.speechSynthesis.speak(voz);
        return;
    }

    // CASO 2: Falta nombre únicamente
    if (nombre === "") {
        let voz = new SpeechSynthesisUtterance("Debes escribir tu nombre");
        voz.lang = "es-ES";
        window.speechSynthesis.speak(voz);
        return;
    }

    // CASO 3: Falta avatar únicamente
    if (avatarSeleccionado === null) {
        let voz = new SpeechSynthesisUtterance("Seleccione un avatar");
        voz.lang = "es-ES";
        window.speechSynthesis.speak(voz);
        return;
    }

    // Guardar los datos si todo está correcto
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("avatarUsuario", avatarSeleccionado);

    // Reproducir sonido de felicitaciones (opcional, si tienes el archivo)
    const audioFeli = document.getElementById("audioFelicidades");
    if (audioFeli) {
        audioFeli.play().catch(e => console.log("Audio bloqueado"));
    }

    // Todo Correcto: Hablar y redirigir al terminar
    let voz = new SpeechSynthesisUtterance("Bien hecho " + nombre);
    voz.lang = "es-ES";
    
    voz.onend = function() {
        window.location.href = "inicio.html"; 
    };

    window.speechSynthesis.speak(voz);

    // Confetti instantáneo
    if (typeof confetti === "function") {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}