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