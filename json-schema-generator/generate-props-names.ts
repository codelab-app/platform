import { readdirSync } from 'fs'
import { resolve } from 'path'

const ANTD_ROOT_PATH = resolve('./node_modules/antd/lib')

const getDirectories = (source: string) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

const filterUtilsFolders = (dirName: string) => dirName.charAt(0) !== '_'

const convertKebabToCamel = (str: string) =>
  str
    .split('-')
    .map((w) => w[0].toUpperCase() + w.substr(1))
    .join('')

const addPropsSuffix = (propName: string) => `${propName}Props`

export const getAntdPropsNames = () =>
  getDirectories(ANTD_ROOT_PATH)
    .filter(filterUtilsFolders)
    .map(convertKebabToCamel)
    .map(addPropsSuffix)
