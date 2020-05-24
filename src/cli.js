import arg from 'arg';
import inquirer from 'inquirer';

async function getConfig(rawArgs) {
    const args = arg({
        '--typescript': Boolean,
        '-ts': '--typescript'
    }, {argv: rawArgs.slice(2)})

    const options = {
        directory: args._[0],
        typescript: args['--typescript'] || false
    }

    const questions = []

    questions.push({
        name: 'pkgMgr',
        type: 'list',
        message: 'Choose your package manager',
        choices: ['NPM', 'Yarn'],
        default: 'Yarn'
    })

    if (!options.directory) {
        questions.push({
            name: 'directory',
            message: 'Please name your project',
            default: 'api'
        })
    }

    if (!options.typescript) {
        questions.push({
            name: 'typescript',
            message: 'Would you like to use typescript for this project?'
            type: 'confirm',
            default: false
        })
    }

    const answers = await inquirer.prompt(questions);

    return {
        pkgMgr: answers.pkgMgr,
        directory: options.directory || answers.directory,
        typescript: options.typescript || answers.typescript
    }
}

export async function cli(args) {
    const options = await getConfig(args);
    console.log(options);
}