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
    if (password.length < 8) {
        showMessage('La contraseña debe tener al menos 8 caracteres.', 'error');
        return false;
    }
    if (!/[A-Z]/.test(password)) {
        showMessage('Se requiere por lo menos una MAYUSCULA', 'error');
        return false;
    }
    return true;
}

// Validar formulario completo
function validateForm() {
    const email = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!emailIsValid(email)) {
        showMessage('El correo no es válido', 'error');
        btn.disabled = true;
        return false;
    }

    if (!validatePassword(password)) {
        btn.disabled = true;
        return false;
    }

    showMessage('Todo correcto ✅', 'success');
    btn.disabled = false;
    return true;
}

// Escuchar inputs
usernameInput.addEventListener('input', validateForm);
passwordInput.addEventListener('input', validateForm);

// Al enviar formulario
form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validateForm()) {
        // Guardar en localStorage SOLO si es válido
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));

        showMessage('Login exitoso!', 'success');
        window.location.href = "html/dashboardd.html";
    } else {
        showMessage('Login fallido. Revisa tu correo y contraseña.', 'error');
    }
});
