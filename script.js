
const apiKey = "at_bsMjDYg9zehhUVqoMMQiovN0McSwt";

let responseObject = {};
var map = L.map(document.querySelector(".map")).setView([51.505, -0.09], 13);

async function fetchIp(ip) {
    var response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`);
    responseObject = await response.json();
    buildInfo();
    map.panTo([responseObject.location.lat, responseObject.location.lng]);
}

function buildInfo() {
    document.querySelector(".ip-address-div").children[1].innerHTML = responseObject.ip;
    document.querySelector(".location-div").children[1].innerHTML = "<p>" + responseObject.location.city + ", " + responseObject.location.region + "<br>" + responseObject.location.country + " " + responseObject.location.postalCode + "</p>";
    document.querySelector(".timezone-div").children[1].innerHTML = "<p>UTC " + responseObject.location.timezone + "</p>";
    document.querySelector(".isp-div").children[1].innerHTML = "<p>" + responseObject.isp + "</p>";
}

window.onload = function () {
    var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);
    const submitButton = document.querySelector(".submit-button");
    submitButton.addEventListener("click", function () {
        const input = document.querySelector(".ip-input").value;
        fetchIp(input);
    });
    // fetchIp("");
}
