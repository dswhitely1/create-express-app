import {packageListGenerator, taskListGenerator} from "./utils";
import execa from "execa";

const packages = {
    express: ['express', 'dotenv'],
    middleware: ['helmet', 'cors']
}

const devPackages = {
    nodemon: ['nodemon'],
    typescript: ['typescript', 'tsc-watch', 'rimraf'],
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

    const typeScriptInit = {
        title: 'TypeScript Initialization',
        task: async () => {
            const result = await execa('npx', ['tsc', '--init', '--moduleResolution', 'node', '--resolveJsonModule', '--target', 'es5', '--noImplicitAny', '--sourceMap', '--lib', 'dom,es2017', '--outDir', 'dist', '--rootDir', 'src'], {
                cwd: options.targetDirectory
            })
            if (result.failed) {
                throw new Error('Failed to create TS Config File')
            }
        }
    }

    const expressTask = taskListGenerator('Express', pkgList['express'], true)
    const middlewareTask = taskListGenerator('Express Middleware', pkgList['middleware'], true)
    const nodemonTask = taskListGenerator('Nodemon', pkgList['nodemon'], true)
    const typescriptTask = taskListGenerator('TypeScript Install', pkgList['typescript'], options.typescript)
    const typesTask = taskListGenerator('Types', pkgList['types'], options.typescript);
    const typeScriptMaster = taskListGenerator('TypeScript', [typescriptTask, typeScriptInit, typesTask], options.typescript)

    return taskListGenerator('API Install', [expressTask, middlewareTask, nodemonTask, typeScriptMaster], true)
}