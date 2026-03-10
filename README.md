# hanna-kovalenko-open-api-project
Project for Intro to Programming course with Code the Dream. Open API project
This project is a JavaScript weather application that retrieves and displays weather data using the Open-Meteo API. The application shows the current weather information for Houston, Texas and also provides the option to view a 7-day weather forecast.
The weather data is fetched using the latitude and longitude of Houston, TX (29.76, -95.36) and displayed dynamically in the browser.
API Information

This project uses the Open-Meteo Forecast API with the geographic coordinates of Houston, Texas.
Location Coordinates
Latitude: 29.76
Longitude: -95.36

Current Weather Request
The application fetches data including:
Maximum temperature
Minimum temperature
Total precipitation
Precipitation duration
Wind speed
Sunrise
Sunset
UV index
Weather condition codes

7-Day Forecast Request
The forecast includes:
Weather condition codes
Maximum temperature
Minimum temperature
Rain amount
Maximum wind speed

Weather condition codes are mapped to icons and descriptions in JavaScript.

You can run this project locally on your computer with just a browser.

How the Application Works:
The user clicks the "Get Weather" button.
JavaScript sends a request to the Open-Meteo API using the Fetch API.
The API returns JSON weather data.
The application extracts the first value from arrays (because the API returns lists).
Weather data is displayed dynamically in the webpage.
The user can click "7-Day Forecast" to load extended weather information.

Additional Functionality – City Selection and Dynamic GET Requests:

At the end of the workflow, an interactive city dropdown is displayed:
A list of predefined cities (London, Berlin, New York, Paris, Rome, Washington) is available.
Each city has its latitude and longitude stored in the dropdown as the value.
When the user selects a city, a GET request is sent to the Open-Meteo API with the city’s coordinates.
The application fetches and displays the current day’s temperature for that city.
The city temperature data is displayed dynamically in a separate container below the dropdown.
This allows users to easily compare the weather of multiple cities without leaving the webpage.