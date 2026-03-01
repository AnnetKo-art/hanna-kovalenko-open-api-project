// Select button and display section
const button = document.getElementById("getWeather");
const weatherSection = document.getElementById("weatherDisplay");

// Add click event
button.addEventListener("click", function() {
//API that will display weather from one day. Open customized API was taken from https://open-meteo.com/
    fetch("https://api.open-meteo.com/v1/forecast?latitude=29.76&longitude=-95.36&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_hours,wind_speed_10m_max,sunrise,sunset,uv_index_max,weather_code&timezone=America%2FChicago&forecast_days=1")

    .then(function(response) {
        return response.json();
    })

    .then(function(data) {
    console.log("Weather Data:", data);
    const windspeed = data.daily.wind_speed_10m_max[0];//I needed [0] because the API returns arrays (lists), not single values.
    const tempMax = data.daily.temperature_2m_max[0];
    const tempMin = data.daily.temperature_2m_min[0];
    const precipitation = data.daily.precipitation_sum[0];
    const precipitationHours = data.daily.precipitation_hours[0];
    const sunrise = data.daily.sunrise[0];
    const sunset = data.daily.sunset[0];
        
        weatherSection.innerHTML = `
            <h2>Current Weather in Houston, TX</h2>
            <p>Temperature Max: ${tempMax}°C</p>
            <p>Temperature Min:${tempMin}°C</p>
            <p>Total Rainfall:: ${precipitation}mm<p>
            <p>Rain Duration: ${precipitationHours}h<p>
            <p> Wind Speed: ${windspeed}km/h<p>
            <p> Sunrise: ${sunrise}<p>
            <p> Sunset: ${sunset}<p>
          
        `;
    })

    .catch(function(error) {
        console.error("Error fetching weather:", error);
        weatherSection.innerHTML = "<p>Unable to load weather data.</p>";
    });

});












