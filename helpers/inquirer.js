const inquirer = require('inquirer');
require('colors');
const menuOptionQuestionsConfig = [
    {
        type: 'list',
        name: 'option',
        message: 'Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            },
        ]
    }
];


const inquirerMenu = async () => {
    console.clear();
    console.log("==========================".green);
    console.log("  Seleccione una opcion".grey);
    console.log("==========================\n".green);
    const { option } = await inquirer.prompt(menuOptionQuestionsConfig)
    return option;
}

const pause = async () => {
    console.log('\n');
    await inquirer.prompt([
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione ${'ENTER'.yellow} para continuar`,

        }
    ])
}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question);
    return desc;

}

const placeList = async (places = []) => {
    const choices = places.map((place, i) => {
        const idx = `${i + 1}`.green;
        return {
            value: place.id,
            name: `${idx}. ${place.name}`
        }
    });
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })
    const configPrompt = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar: ',
            choices
        }
    ]
    const { id } = await inquirer.prompt(configPrompt);

    return id
}

const confirm = async (message) => {
    const configPrompt = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    const { ok } = await inquirer.prompt(configPrompt);

    return ok

}
module.exports = {
    inquirerMenu,
    pause,
    readInput,
    placeList,
    confirm
}