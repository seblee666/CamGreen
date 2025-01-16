// Añadir evento para cambiar la clase activa en la barra de navegación
const navLinks = document.querySelectorAll('.sidebar nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(nav => nav.parentElement.classList.remove('active'));
        link.parentElement.classList.add('active');
    });
});

// Evento de clic para cerrar sesión
document.getElementById('logout').addEventListener('click', () => {
    window.location.href = 'Login.html'; // Redirige al usuario a Login.html
});

// Configuración del gráfico de ejemplo usando Chart.js
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar', // Tipo de gráfico
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'], // Etiquetas del eje X
        datasets: [{
            label: 'Impacto Ambiental', // Etiqueta del gráfico
            data: [12, 19, 3, 5, 2, 3], // Datos del gráfico
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true // Comienza el eje Y en cero
            }
        }
    }
});
