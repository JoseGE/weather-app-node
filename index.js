const { readInput } = require("./helpers/inquirer")


const main = async () => {
    const text = await readInput("Weo: ");
    console.log(text);
}

main();