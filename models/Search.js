const axios = require('axios');
class Search {
    historial = ['Guaricanos', 'Villa Mella', 'Buena Vista'];

    constructor() {

    }

    async city(place = '') {
        try {

            const request = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: {
                    'access_token': process.env.MAPBOX_KEY,
                    'limit': 5,
                    'language': 'es'
                }
            });
            const resp = await request.get();
            return resp.data.features.map(place => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }));

        } catch (err) {

        }

    }
}

module.exports = Search;