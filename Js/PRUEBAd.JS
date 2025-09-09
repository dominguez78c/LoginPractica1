const form = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const btn = document.getElementById('btn');
const messageDiv = document.getElementById('message');

messageDiv.setAttribute('role', 'alert');
messageDiv.setAttribute('aria-live', 'assertive');

function showMessage(text, type = 'info') {
    messageDiv.textContent = text;
    messageDiv.className = type;
}

// Validar email
function emailIsValid(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Validar contraseña
function validatePassword(password) {
    return password.length >= 8;
}

// Función que valida ambas cosas juntas
function validateForm() {
    const email = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!emailIsValid(email)) {
        showMessage('El correo no es válido', 'error');
        btn.disabled = true;
        return false;
    }

    if (!validatePassword(password)) {
        showMessage('La contraseña debe tener al menos 8 caracteres.', 'error');
        btn.disabled = true;
        return false;
    }

    showMessage('Todo correcto ✅', 'success');
    btn.disabled = false;
    return true;
}

// Escuchamos cambios en los campos
usernameInput.addEventListener('input', validateForm);
passwordInput.addEventListener('input', validateForm);

// Cuando se intenta enviar el formulario
form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateForm()) {
        showMessage('Login exitoso!', 'success');
        window.location.href = "html/dashboard.html";
    } else {
        showMessage('Login fallido. Revisa tu correo y contraseña.', 'error');
    }
});
