let avatarSeleccionado = null;

// Seleccionar avatar
function seleccionar(img) {

    // Obtener todos los avatares
    let avatares = document.querySelectorAll('.avatares img');

    // Quitar selección anterior
    avatares.forEach(a => a.classList.remove('seleccionado'));

    // Agregar selección al avatar clickeado
    img.classList.add('seleccionado');

    // Guardar avatar seleccionado
    avatarSeleccionado = img.src;

    // Sonido click
    document.getElementById("audioAvatar").play();

    // Voz avatar seleccionado
    let mensaje = new SpeechSynthesisUtterance(
        "Avatar seleccionado"
    );

    mensaje.lang = "es-ES";

    speechSynthesis.speak(mensaje);
}


// Botón ingresar
function ingresar() {

    // Obtener nombre
    let nombre = document.getElementById('nombre').value.trim();


    // CASO 1
    // Falta nombre y avatar
    if (nombre === "" && avatarSeleccionado === null) {

        let voz = new SpeechSynthesisUtterance(
        hablar ("Debes escribir tu nombre e ingresar un avatar") 
        );

        voz.lang = "es-ES";

        speechSynthesis.speak(voz);

        return;
    }


    // CASO 2
    // Falta nombre
    if (nombre === "") {

        let voz = new SpeechSynthesisUtterance(
            hablar ("Debes escribir tu nombre") 
        );

        voz.lang = "es-ES";

        speechSynthesis.speak(voz);

        return;
    }


    // CASO 3
    // Falta avatar
    if (avatarSeleccionado === null) {

        let voz = new SpeechSynthesisUtterance(
            "Seleccione un avatar"
        );

        voz.lang = "es-ES";

        speechSynthesis.speak(voz);

        return;
    }


    // TODO CORRECTO
    let voz = new SpeechSynthesisUtterance(
        "Bien hecho " + nombre
    );

    voz.lang = "es-ES";

    speechSynthesis.speak(voz);


    // Confetti
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });


    // Abrir otra página después de 2 segundos
    setTimeout(() => {

        window.location.href = "inicio.html";

    }, 2000);
}