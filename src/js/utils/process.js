import data from '@data/data.json';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
export async function createPlanesFromJson({ places }) {
    const provider = new OpenStreetMapProvider();
    const planes = [];
    for (let { id, name, county, website, price_range } of places) {
        const results = await provider.search({
            query: `${name} Co.${county}`,
        });
        if (results.length) {
            const { x, y } = results[0];
            const popup = `<a href=${website}>${name}</a>
                            <b>Price pp: £${price_range}</b> `;
            planes.push({ coords: [id, Number(y), Number(x)], popup });
        }
    }
    return planes;
}

export default createPlanesFromJson(data);
