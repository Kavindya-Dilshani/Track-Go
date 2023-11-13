function initMap() {
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 14,
        center: { lat: 37.77, lng: -122.447 },
    });

    directionsRenderer.setMap(map);
    calculateAndDisplayRoute(directionsRenderer, directionsService);

    document.getElementById("transportationMode").addEventListener("change", () => {
        calculateAndDisplayRoute(directionsRenderer, directionsService);
    });
}

function calculateAndDisplayRoute(directionsRenderer, directionsService) {
    const selectedMode = document.getElementById("transportationMode").value;
    const originInput = document.getElementById("from");
    const destinationInput = document.getElementById("to");


    directionsService.route({
        origin: originInput.value,
        destination: destinationInput.value,
        travelMode: google.maps.TravelMode[selectedMode],
    })
        .then((response) => {
            directionsRenderer.setDirections(response);
            const route = response.routes[0];
            const distanceText = route.legs[0].distance.text;
            const durationText = route.legs[0].duration.text;

            document.getElementById("distance").textContent = `Distance: ${distanceText}`;
            document.getElementById("duration").textContent = `Duration: ${durationText}`;

        })
        .catch((error) => {
            console.error("Direction request failed:", error);
        });
}



