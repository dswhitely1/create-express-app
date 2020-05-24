import {packageListGenerator, taskListGenerator} from "./utils";

const packages = {
    express: ['express'],
    middleware: ['helmet', 'cors']
}

const devPackages = {
    nodemon: ['nodemon'],
    typescript: ['typescript', 'tsc-watch'],
    types: ['@types/node', '@types/express', '@types/cors', '@types/helmet']
}

export const packageList = options => {
    const pkgMgr = options.pkgMgr === 'Yarn' ? 'yarn' : 'npm';
    const pkgMgrFlags = pkgMgr === 'yarn' ? ['add'] : ['i', '-S'];
    const pkgMgrDevFlags = pkgMgr === 'yarn' ? ['add', '--dev'] : ['i', '-D']

    const pkgList = {}

    Object.keys(packages).forEach(pkgs => {
        pkgList[pkgs] = packageListGenerator(pkgMgr, pkgMgrFlags, packages[pkgs], options)
    })

    Object.keys(devPackages).forEach(pkgs => {
        pkgList[pkgs] = packageListGenerator(pkgMgr, pkgMgrDevFlags, devPackages[pkgs], options)
    })

    const expressTask = taskListGenerator('Express', pkgList['express'], true)
    const middlewareTask = taskListGenerator('Express Middleware', pkgList['middleware'], true)
    const nodemonTask = taskListGenerator('Nodemon', pkgList['nodemon'], true)
    const typescriptTask = taskListGenerator('TypeScript Install', pkgList['typescript'], options.typescript)
    const typesTask = taskListGenerator('Types', pkgList['types'], options.typescript);
    const typeScriptMaster = taskListGenerator('TypeScript', [typescriptTask, typesTask], options.typescript)

    return taskListGenerator('API Install', [expressTask, middlewareTask, nodemonTask, typeScriptMaster], true)
}