require('dotenv').config();
const { readInput, inquirerMenu, pause, placeList } = require("./helpers/inquirer");
const Search = require("./models/Search");


const main = async () => {
    const search = new Search();

    let opt;
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                const placeToSearch = await readInput("Ciudad: ");
                const places = await search.city(placeToSearch);
                //Select place
                const IdPlaceSelected = await placeList(places);
                if (IdPlaceSelected === '0') continue;
                const placeInfo = places.find(place => place.id = IdPlaceSelected)
                search.addHistory(placeInfo.name);
                // Weather info
                const weatherPlace = await search.weatherPlace({
                    lat: placeInfo.lat,
                    lon: placeInfo.lng
                });
                console.clear();
                console.log('\n Informacion de la ciudad'.red);
                console.log('Ciudad:', placeInfo.name.green);
                console.log('Latitud:', placeInfo.lat);
                console.log('Longitud:', placeInfo.lng);
                console.log('Temperatura:', weatherPlace.temp);
                console.log('Minima:', weatherPlace.min);
                console.log('Maxima:', weatherPlace.max);
                console.log('Clima:', weatherPlace.description.green);
                break;
            case 2:
                search.getHistory.forEach((placeName, i) => {
                    const id = `${i + 1}`.green;
                    console.log(`${id}. ${placeName}`);
                })
                break;
            default:
                break;
        }
        await pause();
    } while (opt !== 0);
}

main();