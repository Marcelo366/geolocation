const datosDiv = document.querySelector("#datos");
const spinner = document.querySelector(".sk-chase");

navigator.geolocation.watchPosition(position => {
    consultarAPI(position.coords.latitude, position.coords.longitude);
});

function consultarAPI(lat, lon) {
    const apiKey = "dcebcf6a7ec29670c96edafe47c31a1a";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    // console.log(url);
    mostrarSpinner();

    fetch(url)
        .then(response => response.json())
        .then(data => mostrarClima(data));
}

function mostrarClima({name, main: {temp, temp_max, temp_min}, weather: [{icon}]}) {
    const tempActual = parseInt(temp - 273.15);
    const tempMax = parseInt(temp_max - 273.15);
    const tempMin = parseInt(temp_min - 273.15);
    const titulo = document.querySelector("h1");
    const img = document.querySelector("img");
    const actual = document.querySelector("#actual");
    const maxima = document.querySelector("#maxima");
    const minima = document.querySelector("#minima");
    
    titulo.textContent = `Clima en ${name}`;
    actual.innerHTML = `Actual: ${tempActual}&#8451`
    maxima.innerHTML = `Máx: ${tempActual}&#8451`
    minima.innerHTML = `Mín: ${tempActual}&#8451`
    img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

    spinner.innerHTML = "";
}

function mostrarSpinner() {
    spinner.innerHTML = `
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
    `
}