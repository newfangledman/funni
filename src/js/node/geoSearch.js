const leafletGeo = require('leaflet-geosearch');
const { OpenStreetMapProvider } = leafletGeo;
async function geoSearchAndAddToJson({ places }) {
    const provider = new OpenStreetMapProvider();
    console.log(provider);
    console.log(places);
    const planes = [];
    for (let { id, name, location, county, website, price_range } of places) {
        const results = await provider.search({
            query: `${name} ${location} Co.${county}`,
        });
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

module.exports = geoSearchAndAddToJson;
