let dateNow =  new Date()
document.getElementById("date").innerHTML = dateNow


const api = {
    key: "cbf8e726741ef96b67c79530aab07a25",
    baseURL: "http://api.openweathermap.org/data/2.5/"
}

fetch(`${api.baseURL}weather?q=houston&units=imperial&APPID=${api.key}`)
    .then(resp => resp.json())
    .then(function(temp){
        let tempMin=  Math.round(temp.main.temp_min)
        let tempMax=  Math.round(temp.main.temp_max);

        document.getElementById("temp").innerHTML = Math.round(temp.main.temp) + "°F"
        document.getElementById("hi-low").innerHTML = `Min: ${tempMin}°F / Max: ${tempMax}°F`
        document.getElementById("city").innerHTML = temp.name + " / " + temp.sys.country
        document.getElementById("weather").innerHTML = temp.weather[0].main
    })
    
    
    
const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(e){
    if(e.keyCode == 13){
        getResults(searchBox.value)
        console.log(searchBox.value)
    }
}
// query = city name
function getResults(query){
    fetch(`${api.baseURL}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather =>{
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    let city = document.getElementById("city");
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;
    
    let temp = document.getElementById("temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°F</span>`;

    let weather_el = document.getElementById("weather");
    weather_el.innerHTML = weather.weather[0].main

    let hiLow = document.getElementById('hi-low');
    hiLow.innerHTML = `Min: ${Math.round(weather.main.temp_min)}°F / Max: ${Math.round(weather.main.temp_max)}°F`
}