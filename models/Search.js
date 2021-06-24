const axios = require('axios');
const { save, read } = require('../helpers/dataFile');
class Search {
    history = [];

    constructor() {
        this.history = read();
    }
    get getHistory() {
        return this.history.map(placeName => {

            let words = placeName.split(' ');
            placeName = words.map(w => w[0].toUpperCase() + w.substring(1))
            return placeName.join(' ');
        });
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

    async weatherPlace({ lat, lon }) {
        try {
            const request = axios.create({
                baseURL: `http://api.openweathermap.org/data/2.5/weather`,
                params: {
                    'lat': lat,
                    'lon': lon,
                    'appid': process.env.OPENWEATHER_KEY,
                    'units': 'metric',
                    'lang': 'es'
                }
            });
            const resp = await request.get();
            const { weather, main } = resp.data;
            return {
                description: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            };
        } catch (err) {
            return err;
        }
    }
    addHistory(placeName) {
        if (this.history.includes(placeName.toLocaleLowerCase())) {
            return;
        }
        // Limit history list 
        this.history = this.history.splice(0, 5);
        this.history.unshift(placeName.toLocaleLowerCase());
        save(this.history);
    }
}

module.exports = Search;