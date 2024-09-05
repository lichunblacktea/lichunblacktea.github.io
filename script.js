window.onload = function() {
    
    var input = document.getElementById("cityname");

    input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("btn").click();
    }

    });

    
}

    
function myfunction(){
    city = document.getElementById("cityname").value;
    console.log("success");

    //Clear Data
    document.getElementById("city").innerText = "City: ";
    document.getElementById("weather").innerText = "Weather: ";
    document.getElementById("temp").innerText = "Teamperature: ";
    document.getElementById("cityname").value = "";


    //Call new data
    cityUrlApi= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=fdd226a7d31b2bc41a80b4ed416403b2"
    console.log(cityUrlApi);
    $.getJSON(
        cityUrlApi ,
        function(data){
            
            console.log(data);
            var icon ="https://api.openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            var temp = Math.floor((data.main.temp-273.15)*100)/100;
            var weather = data.weather[0].main;
            var city = data.name;
            
            
            $('.icon').attr("src", icon);        
            $('.temp').append(temp);
            $('.weather').append(weather);
            $('.city').append(city);

        
    });
};

// Generic function to update input fields
function updateInput(selectId, inputName) {
  const selectElement = document.getElementById(selectId);
  const inputElement = document.getElementsByName(inputName)[0];
  inputElement.value = selectElement.value;
}

document.addEventListener('DOMContentLoaded', (event) => {
  // Currency select event listener
  const currencySelect = document.getElementById('currencySelect');
  currencySelect.addEventListener('change', () => updateInput('currencySelect', 'currencyInput'));

  // Language select event listener
  const langSelect = document.getElementById('languageSelect');
  langSelect.addEventListener('change', () => updateInput('languageSelect', 'langInput'));

  // Brand select event listener
  const brandSelect = document.getElementById('brandSelect');
  brandSelect.addEventListener('change', () => updateInput('brandSelect', 'brandInput'));

  // Skin select event listener
  const skinSelect = document.getElementById('skinSelect');
  skinSelect.addEventListener('change', () => updateInput('skinSelect', 'skinInput'));

  // Game category select event listener
  const gameCategorySelect = document.getElementById('gameCategorySelect');
  gameCategorySelect.addEventListener('change', () => updateInput('gameCategorySelect', 'gameCategoryInput'));

  // Game interface select event listener
  const gameInterfaceSelect = document.getElementById('gameInterfaceSelect');
  gameInterfaceSelect.addEventListener('change', () => updateInput('gameInterfaceSelect', 'gameInterfaceInput'));

  // Table ID select event listener
  const tabeIDSelect = document.getElementById('tabeIDSelect');
  tabeIDSelect.addEventListener('change', () => updateInput('tabeIDSelect', 'tabeIDInput'));
});
