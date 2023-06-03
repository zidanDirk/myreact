import path from 'path'
import fs from 'fs'
import ts from 'rollup-plugin-typescript2'
import csj from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'

const pkgPath = path.resolve(__dirname, '../../packages')
const distPath = path.resolve(__dirname, '../../dist/node_modules')

export function resolvePkgPath(pkgName, isDist) {
    if(isDist) {
        return `${distPath}/${pkgName}`
    } else {
        return `${pkgPath}/${pkgName}`
    }
}

export function getPackageJSON (pkgName) {
    // 包路径
    const path = `${resolvePkgPath(pkgName)}/package.json`
    const str = fs.readFileSync(path, {  encoding: 'utf-8' })
    return JSON.parse(str)
}

export function getBaseRollupPlugins({
    alias = {
        __DEV__: true
    },
    typescript = {}} = {}) {
    return [
        replace(alias),
        csj(),
        ts(typescript)
    ]
}