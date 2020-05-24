import path from 'path';
import execa from 'execa';
import fs from 'fs';
import Listr from 'listr';
import ncp from 'ncp';


export const createProject = async (options) => {
    options = {
        ...options,
        template: options.typescript ? 'typescript' : 'javascript',
        targetDirectory: options.targetDirectory || `${process.cwd()}/${options.directory}`
    }

    const currentUrl = import.meta.url
    const templateDir = path.resolve(new URL(currentUrl).pathname, '../../templates', options.template.toLowerCase());
    options.templateDirectory = templateDir;



    const packages = {
        express: ['express'],
        middleware: ['helmet', 'cors']
    }

    const devPackages = {
        nodemon: ['nodemon'],
        typescript: ['typescript', 'tsc-watch'],
        types: ['@types/node', '@types/express', '@types/cors', '@types/helmet']
    }


}