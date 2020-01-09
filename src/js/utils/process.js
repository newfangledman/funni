import data from '@data/data.json';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
export async function createPlanesFromJson({ places }) {
    const provider = new OpenStreetMapProvider();
    const planes = [];
    for (let place of places) {
        const results = await provider.search({
            query: `${place.name} Co.${place.county}`,
        });
        if (results.length) {
            const { x, y } = results[0];
            planes.push([place.id, Number(y), Number(x)]);
        }
    }
    return planes;
}

export default createPlanesFromJson(data);
