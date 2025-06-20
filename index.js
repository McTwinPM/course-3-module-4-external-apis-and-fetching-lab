// index.js

// Step 1: Fetch Data from the API
// - Create a function `fetchWeatherData(city)`
// - Use fetch() to retrieve data from the OpenWeather API
// - Handle the API response and parse the JSON
// - Log the data to the console for testing
async function fetchWeatherData(city) {
    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4dca6b14b9cba5504e6ff7b4323aa2ae`;
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayError(error.message);
        throw error;
    }
}


// Step 2: Display Weather Data on the Page
// - Create a function `displayWeather(data)`
// - Dynamically update the DOM with weather details (e.g., temperature, humidity, weather description)
// - Ensure the function can handle the data format provided by the API
function displayWeather(data) {
    const weatherDisplay = document.getElementById('weather-display');
    if (!weatherDisplay) {
        console.error('Weather display element not found');
        return;
    }
    weatherDisplay.innerHTML = `
        <h2>Location: ${data.name}</h2>
        <p>Temperature: ${(data.main.temp - 273.15).toFixed(0)}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Description: ${data.weather[0].description}</p>
    `;
}
// Step 3: Handle User Input
// - Add an event listener to the button to capture user input
// - Retrieve the value from the input field
// - Call `fetchWeatherData(city)` with the user-provided city name
document.addEventListener("click", function (event) {
    if (event.target.id === 'fetch-weather') {
        const cityInput = document.getElementById('city-input');
        const city = cityInput.value.trim();
        fetchWeatherData(city)
    }
    

})
// Step 4: Implement Error Handling
// - Create a function `displayError(message)`
// - Handle invalid city names or network issues
// - Dynamically display error messages in a dedicated section of the page
function displayError(message){
    const errorMessage = document.getElementById('error-message');
    if (!errorMessage) {
        console.error('Error message element not found');
        return;
    }
    errorMessage.classList.remove('hidden');
    errorMessage.textContent = `${message}`;
}
// Step 5: Optimize Code for Maintainability
// - Refactor repetitive code into reusable functions
// - Use async/await for better readability and to handle asynchronous operations
// - Ensure all reusable functions are modular and clearly named

// BONUS: Loading Indicator
// - Optionally, add a loading spinner or text while the API request is in progress

// BONUS: Additional Features
// - Explore adding more features, such as displaying additional weather details (e.g., wind speed, sunrise/sunset)
// - Handle edge cases, such as empty input or API rate limits

// Event Listener for Fetch Button
// - Attach the main event listener to the button to start the process
module.exports = {
    fetchWeatherData,
    displayWeather,
    displayError
};