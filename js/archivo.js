const api = {
    key: '9e122cd782b2d0333f5fe4e7fa192062',
    url: `https://api.openweathermap.org/data/2.5/weather`
}
//Informacion box
const city = document.getElementById('city');
const date = document.getElementById('date');
const img = document.getElementById('temp-img');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');
const card = document.getElementById('car-view');
function updateImage(date){

    const temperaturaC = toCelcius(date.main.temp);
    if(temperaturaC >26){
        src='img/sunbro.jpg';
    }
    else if(temperaturaC > 20){
        src='img/soleado.png';
    }
    else if(temperaturaC > 15){
        src='img/nublado.png';
    }
    else if(temperaturaC > 10){
        src='img/aire-frio.png';
    }
    else if(temperaturaC <7){
        src='img/temperaturabaja.png';
    }  
    console.log(src); 
    img.src = src;
}


async function seach(query) {
    try {
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
        const data = await response.json();
        let tmp =  `${toCelcius(data.main.temp)}`;
        card.style.display = 'block';
        console.log(data);
        city.innerHTML = `${data.name}, ${data.sys.country}`;
        date.innerHTML = (new Date()).toLocaleDateString();
        temp.innerHTML = tmp+'°C';
        weather.innerHTML = data.weather[0].description;
        range.innerHTML = `${toCelcius(data.main.temp_min)}°C - ${ toCelcius(data.main.temp_max)}°C`;
        updateImage(data);

    } catch (error) {
        console.log(error);
        alert("No se puede consultar el clima en este momento");
    }
}

function onSubmit(event) {
    event.preventDefault();
    seach(nombre.value);
}

function toCelcius(kelvin){
    return Math.round(kelvin - 273.15);
}


const form = document.getElementById('for-imput');
const nombre = document.getElementById('searchbox');
form.addEventListener('submit', onSubmit, true);