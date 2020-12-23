import { readdirSync } from 'fs'
import { resolve } from 'path'

const COMPONENTS_ROOT_PATH = resolve('./libs/alpha/ui/antd/src/components')

const getDirectories = (source: string) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

const convertKebabToCamel = (str: string) =>
  str
    .split('-')
    .map((w) => w[0].toUpperCase() + w.substr(1))
    .join('')

const addPropsSuffix = (propName: string) => `${propName}.AntdProps`

export const getAntdPropsNames = () =>
  getDirectories(COMPONENTS_ROOT_PATH)
    .map(convertKebabToCamel)
    .map(addPropsSuffix)
