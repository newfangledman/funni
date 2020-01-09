import data from '@data/data.json';
export function createPlanesFromJson({ places }) {
    for (let place of places) {
        console.log(place);
    }
    return [];
}

export default createPlanesFromJson(data);
