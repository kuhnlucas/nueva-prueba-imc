const contenedorClima = document.getElementById('contenedor-clima');

const apiKey = 'c18c257f3235478fb03223818241604'; 
const location2 ='Posadas, Misiones'; // Reemplaza con la ubicación para la que deseas obtener el clima
const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location2}`;


function api () {
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
     const { location, current } = data;
     const climaHtml = `
         <h2>${location.name} </h2>
         <h3> ${location.country}</h3>
         <label class= "input-field-stat"> <p><i class="fa-solid fa-temperature-three-quarters"></i> ${current.temp_c}°C</p> </label>
         <label class= "input-field-stat"> <p><img src="${current.condition.icon}" alt=""></p> </label>
         <label class= "input-field-stat"> <p><span class="material-symbols-outlined">
         humidity_percentage
         </span> ${current.humidity}%</p> </label> `;
    contenedorClima.innerHTML = climaHtml;
  })
  .catch(error => {
    console.error('Hubo un problema con la operación fetch:', error);
    contenedorClima.innerHTML = '<p>No se pudo obtener los datos del clima</p>';
  });
};
api ();