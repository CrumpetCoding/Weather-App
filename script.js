const weatherForm = document.querySelector(".weatherForm");
const locationInput = document.querySelector(".locationInput");
const card = document.querySelector(".card");
const apiKey = "ec2c9c26934b3a7c9a261a46aee1a375";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const location = locationInput.value;

    if(location){
        try{
            const weatherData = await getWeatherData(location);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please enter a location");
    }

});

async function getWeatherData(location){
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data){
    const {name: location, 
        main: {temp, feels_like, humidity},
        weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const locationDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const feelsLike = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherSymbol = document.createElement("p");

    locationDisplay.textContent = location;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    feelsLike.textContent = `Feels like: ${(feels_like - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherSymbol.textContent = getWeatherSymbol(id);


    locationDisplay.classList.add("locationDisplay");
    tempDisplay.classList.add("tempDisplay");
    feelsLike.classList.add("feelsLike");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherSymbol.classList.add("weatherSymbol");

    card.appendChild(locationDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(feelsLike);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherSymbol);

    console.log(data);

}

function getWeatherSymbol(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "🌞";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "🛸";
    }
}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}