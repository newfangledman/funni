import data from '@data/data.json';
import markers from '@data/markers.json';
import { EsriProvider } from 'leaflet-geosearch';

const provider = new EsriProvider();
async function createPlanesFromJson({ places }, key) {
    if (markers) {
        return markers;
    }
    const provider = new EsriProvider();
    const planes = [];
    for (let { id, name, location, county, website, price_range } of places) {
        const address = `${name} ${location} Co.${county}`;
        const results = await provider.search({
            query: address,
        });
        console.log(address, results);
        if (results.length) {
            const { x, y } = results[0];
            const popup = `<a href=${website}>${name}</a>
                           <br/>
                           <b>Price pp: £${price_range}</b> `;
            planes.push({ coords: [id, Number(y), Number(x)], popup });
        }
    }
    return planes;
}

const key = process.env.GOOGLE_MAPS_API_KEY;

export default createPlanesFromJson(data, key);
