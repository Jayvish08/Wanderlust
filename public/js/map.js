const map = L.map('map').setView(coordinates.reverse(), 13);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

console.log(coordinates.reverse());

const customIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/128/684/684908.png', // Custom icon URL
    iconSize: [38, 38],  // Width, Height
    iconAnchor: [19, 38], // Center of icon
    popupAnchor: [0, -38] // Popup position
});

const customMarker = L.marker(coordinates.reverse(), { icon: customIcon })
    .addTo(map)
    .bindPopup(title);

// const circle = L.circle([28.613196, 77.209911], {
//     color: 'red',
//     fillColor: '#f03',
//     fillOpacity: 0.5,
//     radius: 500
// }).addTo(map).bindPopup('I am a circle.');

const polygon = L.polygon([
    coordinates.reverse(),
    coordinates.reverse(),
    coordinates.reverse()
]).addTo(map).bindPopup('I am a polygon.');


// const popup = L.popup()
//     .setLatLng(coordinates.reverse())
//     .setContent(title)
//     .openOn(map);

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(`You clicked the map at ${e.latlng.toString()}`)
        .openOn(map);
}

map.on('click', onMapClick);