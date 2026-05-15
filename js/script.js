let avatarSeleccionado = null;

function seleccionar(img) {
    // 1. Manejo visual de la selección
    let avatares = document.querySelectorAll('.avatares img');
    avatares.forEach(a => a.classList.remove('seleccionado'));
    img.classList.add('seleccionado');

    // 2. Guardar la ruta de la imagen
    avatarSeleccionado = img.src;

    // 3. Sonido de click (opcional, asegúrate que la ruta sea correcta)
    const sonido = document.getElementById("audioAvatar");
    if (sonido) {
        sonido.currentTime = 0; // Reinicia el sonido si haces click rápido
        sonido.play().catch(e => console.log("Sonido bloqueado hasta interacción"));
    }

    // 4. COMANDO DE VOZ (Lo que te faltaba)
    // Cancelamos cualquier voz anterior para que no se amontonen
    window.speechSynthesis.cancel(); 

    let mensaje = new SpeechSynthesisUtterance("Avatar seleccionado");
    mensaje.lang = "es-ES";
    mensaje.rate = 1; // Velocidad normal
    mensaje.pitch = 1.2; // Un toque más agudo para que sea amigable
    
    window.speechSynthesis.speak(mensaje);
}
