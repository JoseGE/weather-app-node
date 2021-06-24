const fs = require('fs')
const filePath = "./data/history.json"
const save = (data) => {

    fs.writeFileSync(filePath, JSON.stringify(data));
}
const read = () => {
    if (!fs.existsSync(filePath)) {

        return null;
    }
    const info = fs.readFileSync(filePath, { encoding: 'utf-8' });
    return JSON.parse(info);
}


module.exports = {
    save,
    read
}