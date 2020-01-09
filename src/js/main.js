import L from 'leaflet';
import planes from '@utils/process';

const NORTHERN_IRELAND = [54.607868, -7.0];

const map = L.map('map').setView(NORTHERN_IRELAND, 8);
const mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; ' + mapLink + ' Contributors',
    maxZoom: 18,
}).addTo(map);

planes.then(data => {
    for (var i = 0; i < data.length; i++) {
        console.log(data);
        const marker = new L.marker([data[i][1], data[i][2]])
            .bindPopup(data[i][0])
            .addTo(map);
    }
});
