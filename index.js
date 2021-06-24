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
                const IdPlaceSelected = await placeList(places);
                const placeInfo = places.find(place => place.id = IdPlaceSelected)
                console.log(placeInfo);
                break;

            default:
                break;
        }
        await pause();
    } while (opt !== 0);
}

main();