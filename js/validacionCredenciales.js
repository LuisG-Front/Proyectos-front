const formLogin = document.getElementById("form_login");
const mensaje = document.getElementById("mensaje");

formLogin.addEventListener("submit", function(event) {
    event.preventDefault();  // para manejar la validación sin iterrupción
    validateLogin();
});

function validateLogin() {

    const validUsername = "js";
    const validPassword = "1234";


    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;


    if (username === validUsername && password === validPassword) {
        mensaje.textContent = "Ha iniciado sesión correctamente";
        // queda pendiente aplicar accion de redirección
        window.location.href = "todolist.html"
    } else {
        mensaje.textContent = "¡Credenciales incorrectas!";
    }
}
