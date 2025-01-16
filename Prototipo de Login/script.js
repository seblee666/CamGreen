const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (response.ok) {
            alert('Inicio de sesión exitoso');
            window.location.href = 'dashboard.html';
        } else {
            errorMessage.textContent = result.message || 'Usuario o contraseña incorrectos.';
        }
    } catch (error) {
        errorMessage.textContent = 'Error de conexión con el servidor.';
    }
});