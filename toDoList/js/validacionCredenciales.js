const formLogin = document.getElementById("form_login");
const mensaje = document.getElementById("mensaje");

username.value = "";
password.value = "";

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
        window.location.href = "todolist.html"
    }else if( username === "" && password ===""){
        alert("Ingrese credenciales, campos en blanco...")
    }else {
        alert("Usuario o contraseña incorrectas")
    }
}
x