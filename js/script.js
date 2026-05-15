let avatarSeleccionado = null;

function seleccionar(img) {
    let avatares = document.querySelectorAll('.avatares img');
    avatares.forEach(a => a.classList.remove('seleccionado'));
    img.classList.add('seleccionado');

    avatarSeleccionado = img.src; // Guardamos la URL de la imagen

    // Sonido y Voz
    document.getElementById("audioAvatar").play();
    let mensaje = new SpeechSynthesisUtterance("Avatar seleccionado");
    mensaje.lang = "es-ES";
    speechSynthesis.speak(mensaje);
}

function ingresar() {
    let nombre = document.getElementById('nombre').value.trim();
    let textoVoz = "";

    // Validaciones
    if (nombre === "" && avatarSeleccionado === null) {
        textoVoz = "Debes escribir tu nombre y seleccionar un avatar";
    } else if (nombre === "") {
        textoVoz = "Debes escribir tu nombre";
    } else if (avatarSeleccionado === null) {
        textoVoz = "Seleccione un avatar";
    }

    if (textoVoz !== "") {
        let voz = new SpeechSynthesisUtterance(textoVoz);
        voz.lang = "es-ES";
        speechSynthesis.speak(voz);
        return;
    }

    // SI TODO ESTÁ BIEN: Guardar en el navegador
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("avatarUsuario", avatarSeleccionado);

    let vozExito = new SpeechSynthesisUtterance("Bien hecho " + nombre);
    vozExito.lang = "es-ES";
    speechSynthesis.speak(vozExito);

    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });

    setTimeout(() => {
        window.location.href = "inicio.html";
    }, 2000);
}
