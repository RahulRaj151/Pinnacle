// API key for WeatherAPI.com
const API_KEY = "afee84ba701846fda36100328250209" ; // Replace with your actual API key from WeatherAPI.com
const BASE_URL = "https://api.weatherapi.com/v1";

// DOM elements
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const cityName = document.getElementById('city-name');
const currentDate = document.getElementById('current-date');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const feelsLike = document.getElementById('feels-like');
const weatherDescription = document.getElementById('weather-description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const pressure = document.getElementById('pressure');
const forecastContainer = document.getElementById('forecast-container');
const errorMessage = document.getElementById('error-message');

// Event listeners
searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        getWeatherData(city);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});

// Initialize with default city
document.addEventListener('DOMContentLoaded', () => {
    getWeatherData('London');
});

// Get current weather and forecast data
async function getWeatherData(city) {
    try {
        // Clear previous error messages
        errorMessage.style.display = 'none';
        
        // Get current weather and 3-day forecast in one call
        const weatherResponse = await fetch(
            `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`
        );
        
        if (!weatherResponse.ok) {
            throw new Error('City not found');
        }
        
        const weatherData = await weatherResponse.json();
        displayCurrentWeather(weatherData);
        displayForecast(weatherData);
        
    } catch (error) {
        showError(error.message);
    }
}

// Display current weather data
function displayCurrentWeather(data) {
    // Format date
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    // Update DOM elements
    cityName.textContent = `${data.location.name}, ${data.location.country}`;
    currentDate.textContent = date.toLocaleDateString('en-US', options);
    weatherIcon.src = `https:${data.current.condition.icon}`;
    weatherIcon.alt = data.current.condition.text;
    temperature.textContent = `${Math.round(data.current.temp_c)}°C`;
    feelsLike.textContent = `Feels like: ${Math.round(data.current.feelslike_c)}°C`;
    weatherDescription.textContent = data.current.condition.text;
    humidity.textContent = `${data.current.humidity}%`;
    windSpeed.textContent = `${data.current.wind_kph} km/h`;
    pressure.textContent = `${data.current.pressure_mb} hPa`;
}

// Display 5-day forecast
function displayForecast(data) {
    // Clear previous forecast
    forecastContainer.innerHTML = '';
    
    // Get forecast days (WeatherAPI.com provides daily forecasts directly)
    const dailyForecasts = data.forecast.forecastday;
    
    // Create forecast cards
    dailyForecasts.forEach(forecast => {
        const date = new Date(forecast.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');
        
        forecastCard.innerHTML = `
            <div class="forecast-date">${dayName}, ${monthDay}</div>
            <div class="forecast-icon">
                <img src="https:${forecast.day.condition.icon}" 
                     alt="${forecast.day.condition.text}">
            </div>
            <div class="forecast-temp">${Math.round(forecast.day.avgtemp_c)}°C</div>
            <div class="forecast-description">${forecast.day.condition.text}</div>
        `;
        
        forecastContainer.appendChild(forecastCard);
    });
}

// Show error message
function showError(message) {
    errorMessage.textContent = `Error: ${message}`;
    errorMessage.style.display = 'block';
}