// 1. Seleccionamos los elementos del DOM (Document Object Model) que necesitamos manipular
const contadorElemento = document.getElementById('contador');
const btnIncrementar = document.getElementById('btn-incrementar');
const btnDecrementar = document.getElementById('btn-decrementar');

// 2. Definimos el estado de nuestra aplicación (una variable simple)
let contador = 0;

// 3. Función para actualizar la vista (el HTML) basándose en el estado
function actualizarVista() {
    contadorElemento.textContent = contador;
}

// 4. Añadimos "escuchadores de eventos" (Event Listeners) a los botones
btnIncrementar.addEventListener('click', function() {
    contador++; // Modificamos el estado
    actualizarVista(); // Actualizamos manualmente el DOM
});

btnDecrementar.addEventListener('click', function() {
    contador--; // Modificamos el estado
    actualizarVista(); // Actualizamos manualmente el DOM
});
