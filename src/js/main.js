import L from 'leaflet';
import planes from '@utils/process';

const mapHandle = document.getElementById('map');
const loading = document.createElement('img');
loading.setAttribute('src', 'public/assets/loading.gif');
loading.setAttribute('height', '600');
loading.setAttribute('width', '800');
mapHandle.appendChild(loading);
planes.then(markers => {
    const NORTHERN_IRELAND = [54.607868, -7.0];

    const map = L.map('map').setView(NORTHERN_IRELAND, 8);
    const mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink + ' Contributors',
        maxZoom: 18,
    }).addTo(map);
    markers.forEach(({ coords, popup }) => {
        const [id, lat, long] = coords;
        const marker = new L.marker([lat, long]).bindPopup(popup).addTo(map);
    });
});
