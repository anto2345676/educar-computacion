        document.addEventListener("DOMContentLoaded", function () {
            const nombre = localStorage.getItem("nombreUsuario");
            const avatar = localStorage.getItem("avatarUsuario");
            
            document.getElementById("nombreUsuario").textContent = nombre;
            document.getElementById("avatarUsuario").src = avatar;
        });