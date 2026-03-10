// Weather code display → emoji and description
const weatherCodes = {
  0: { description: "Clear Sky", icon: "☀️" },
  1: { description: "Mainly Clear", icon: "🌤️" },
  2: { description: "Partly Cloudy", icon: "⛅" },
  3: { description: "Overcast", icon: "☁️" },
  45: { description: "Fog", icon: "🌫️" },
  48: { description: "Depositing rime fog", icon: "🌫️" },
  51: { description: "Light Drizzle", icon: "🌦️" },
  53: { description: "Moderate Drizzle", icon: "🌦️" },
  55: { description: "Dense intensity Drizzle", icon: "🌦️" },
  56: { description: "Light Freezing Drizzle", icon: "❄️🌧️" },
  57: { description: "Dense Freezing Drizzle", icon: "❄️🌧️" },
  61: { description: "Light Rain", icon: "🌧️" },
  63: { description: "Moderate Rain", icon: "🌧️" },
  71: { description: "Snow", icon: "❄️" },
  95: { description: "Thunderstorm", icon: "⛈️" },
};

// Select button and display section
const button = document.getElementById("getWeather");
const weatherSection = document.getElementById("weatherDisplay");

// Add click event Button1 - Current Day Weather
button.addEventListener("click", function () {
  //API that will display weather from one day. Open customized API was taken from https://open-meteo.com/
  fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=29.76&longitude=-95.36&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_hours,wind_speed_10m_max,sunrise,sunset,uv_index_max,weather_code&timezone=America%2FChicago&forecast_days=1",
  )
    .then(function (response) {
      // Convert the response to JSON so we can work with it
      return response.json();
    })

    .then(function (data) {
      console.log("Weather Data:", data);
      // Extracting values from arrays returned by API. The [0] gets the first (and only) day.
      const windspeed = data.daily.wind_speed_10m_max[0]; //I needed [0] because the API returns arrays (lists), not single values.
      const tempMax = data.daily.temperature_2m_max[0];
      const tempMin = data.daily.temperature_2m_min[0];
      const precipitation = data.daily.precipitation_sum[0];
      const precipitationHours = data.daily.precipitation_hours[0];
      const sunrise = data.daily.sunrise[0];
      const sunset = data.daily.sunset[0];

      // Display weather info into the DOM:
      weatherSection.innerHTML = `
            <h2>Current Weather in Houston, TX</h2>
            <p>Temperature Max: ${tempMax}°C</p>
            <p>Temperature Min:${tempMin}°C</p>
            <p>Total Rainfall: ${precipitation}mm</p>
            <p>Rain Duration: ${precipitationHours}h</p>
            <p> Wind Speed: ${windspeed}km/h</p>
            <p> Sunrise: ${sunrise}</p>
            <p> Sunset: ${sunset}</p>
            <button id="forecastBtn">Click here to know forecast for 7 days</button> 
            <div id="forecastContainer"></div>
            <div id="cityWeatherSection"></div>
            `;

      // SECOND EVENT LISTENER (7-DAY FORECAST)
      const forecastButton = document.getElementById("forecastBtn");
      const forecastContainer = document.getElementById("forecastContainer");
      //const cityWeatherSection = document.getElementById("cityWeatherSection");

      // Event listener for 7-day forecast button
      forecastButton.addEventListener("click", function () {
        // Fetch 7-day forecast with coordinates of Houston, TX. We are pulling data for this city from open API service
        fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=29.7633&longitude=-95.3633&daily=weather_code,temperature_2m_max,temperature_2m_min,rain_sum,wind_speed_10m_max",
        )
          .then(function (response) {
            return response.json();
          })

          .then(function (forecastData7Days) {
            let forecastHTML = "<h2>7-Day Forecast</h2>";
            // Loop through each day and build HTML for forecast
            for (let i = 0; i < forecastData7Days.daily.time.length; i++) {
              const code = forecastData7Days.daily.weather_code[i];
              // Map weather code to description & emoji; fallback to "Unknown" if code not found.
              //There are many different wmogies for different codes. In my code I didn't display all of them. That is why I placed this piece of code.
              const weatherInfo = weatherCodes[code] || {
                description: "Unknown",
                icon: "❓",
              };
              // display in DOM data for 7-day weather forecast
              forecastHTML += `
                                <div class="forecast-day">
                                    <h3>${forecastData7Days.daily.time[i]}</h3>
                                    <p style="font-size: 30px;">
                                        ${weatherInfo.icon}
                                    </p>
                                    <p><strong>${weatherInfo.description}</strong></p>
                                    <p>Max: ${forecastData7Days.daily.temperature_2m_max[i]}°C</p>
                                    <p>Min: ${forecastData7Days.daily.temperature_2m_min[i]}°C</p>
                                    <p>Rain: ${forecastData7Days.daily.rain_sum[i]}mm</p>
                                    <p>Wind: ${forecastData7Days.daily.wind_speed_10m_max[i]}km/h</p>
                                </div>
                                <hr>
                            `;
            }

            forecastContainer.innerHTML = forecastHTML;

            //-------- CITY DROPDOWN + SEPARATE DISPLAY CONTAINER ----------------
            //  Define an array of city objects with name, latitude, and longitude
            const cities = [
              { name: "London", lat: 51.5072, lon: -0.1276 },
              { name: "Berlin", lat: 52.52, lon: 13.405 },
              { name: "New York", lat: 40.7128, lon: -74.006 },
              { name: "Paris", lat: 48.8566, lon: 2.3522 },
              { name: "Rome", lat: 41.9028, lon: 12.4964 },
              { name: "Washington", lat: 38.9072, lon: -77.0369 },
            ];
            //  Clear previous content from the cityWeatherSection container
            // This ensures that if the user clicks multiple times, the old dropdown and results are removed
            const cityWeatherSection =
              document.getElementById("cityWeatherSection");
            cityWeatherSection.innerHTML = "";

            // Create a label for the dropdown
            const label = document.createElement("label");
            label.innerText = "Select a city to view temperature: ";
            //  Create the <select> element (dropdown)
            const select = document.createElement("select");

            // Add an empty initial option
            // This makes the dropdown start with a placeholder, so no city is selected initially
            const optionEmpty = document.createElement("option");
            optionEmpty.value = "";
            optionEmpty.textContent = "-- Select a city --";
            select.appendChild(optionEmpty);

            // Add city options into dropdown
            // Loop through the cities array, create an <option> for each city, and set its value as "lat,lon"
            cities.forEach(function (city) {
              const option = document.createElement("option");
              option.value = `${city.lat},${city.lon}`; // store coordinates as the value
              option.textContent = city.name; // show city name to user
              select.appendChild(option);
            });
            //Create a container to display the temperature of the selected city
            const cityTempContainer = document.createElement("div");

            //Inject the label, dropdown, and display container into the DOM
            cityWeatherSection.appendChild(label);
            cityWeatherSection.appendChild(select);
            cityWeatherSection.appendChild(cityTempContainer);

            //Add event listener for when a city is selected
            select.addEventListener("change", function () {
              if (select.value === "") {
                cityTempContainer.innerHTML = "";
                return;
              }
              // Extract latitude and longitude from the selected value
              const coords = select.value.split(",");
              const lat = coords[0];
              const lon = coords[1];
              //Fetch weather for the selected city from the API
              fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&forecast_days=1`,
              )
                .then(function (response) {
                  return response.json(); // Convert response to JSON
                })

                .then(function (cityData) {
                  // Extract max and min temperature from the API response
                  const maxTemp = cityData.daily.temperature_2m_max[0];
                  const minTemp = cityData.daily.temperature_2m_min[0];
                  //Inject temperature data into the cityTempContainer
                  // Display results dynamically for the selected city
                  cityTempContainer.innerHTML = `
                                <h3>Temperature for Selected City</h3>
                                <p>Max Temperature: ${maxTemp}°C</p>
                                <p>Min Temperature: ${minTemp}°C</p>
                            `;
                });
            });
            //Disable the forecast button to prevent multiple clicks after forecast is loaded
            forecastButton.disabled = true;
            forecastButton.innerText = "Forecast Loaded";
          })
          //Catch any errors in fetching the 7-day forecast and display a message
          .catch(function (error) {
            console.error("Error fetching forecast:", error);
            forecastContainer.innerHTML =
              "<p>Unable to load 7-day forecast.</p>";
          });
      });
    })

    .catch(function (error) {
      console.error("Error fetching weather:", error);
      weatherSection.innerHTML = "<p>Unable to load weather data.</p>";
    });
});
