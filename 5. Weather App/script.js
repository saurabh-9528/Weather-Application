/* --------------- Weather Web App  --------------------- */

// Getting HTML elements by their IDs
let show = document.getElementById("show"); // Container to display weather details
let search = document.getElementById("search"); // Search button
let cityVal = document.getElementById("city"); // Input field for city name

// API Key for OpenWeatherMap (Replace with your own key)
let key = "2f745fa85d563da5adb87b6cd4b81caf";

/* ------------------ Function to Fetch and Display Weather Data ------------------ */
let getWeather = () => {
    // Get the value entered by the user
    let cityValue = cityVal.value;

    // Check if the input is empty
    if (cityValue.length == 0) {
        show.innerHTML = `<h3 class="error">Please enter a city name</h3>`;
    } else {
        // Construct the API URL with user input, API key, and metric units
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;

        // Clear input field after clicking search
        cityVal.value = "";

        // Fetch data from OpenWeatherMap API
        fetch(url)
            .then((resp) => resp.json()) // Convert response to JSON
            .then((data) => {
                // Display weather details in the "show" div
                show.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2> <!-- City Name and Country -->
                <h4 class="weather">${data.weather[0].main}</h4> <!-- Main weather condition -->
                <h4 class="desc">${data.weather[0].description}</h4> <!-- Description of weather -->
                <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"> <!-- Weather icon -->
                <h1>${data.main.temp} &#176;</h1> <!-- Current temperature -->
                
                <!-- Container for Min & Max temperature -->
                <div class="temp_container">
                    <div>
                        <h4 class="title">Min</h4>
                        <h4 class="temp">${data.main.temp_min}&#176;</h4> <!-- Minimum temperature -->
                    </div>
                    <div>
                        <h4 class="title">Max</h4>
                        <h4 class="temp">${data.main.temp_max}&#176;</h4> <!-- Maximum temperature -->
                    </div>   
                </div>
                `;
            })
            // If the city is not found or API request fails
            .catch(() => {
                show.innerHTML = `<h3 class="error">City not found</h3>`;
            });
    }
};

/* ------------------ Event Listeners ------------------ */

// Call getWeather() when the search button is clicked
search.addEventListener("click", getWeather);

// Call getWeather() when the page is loaded to display default weather data
window.addEventListener("load", getWeather);
