import { readdirSync } from 'fs'
import { resolve } from 'path'
import { camelCase, capitalize } from 'voca'

export const COMPONENTS_ROOT_PATH = resolve(
  './libs/alpha/ui/antd/src/components',
)

const getDirectories = (source: string) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

const addPropsSuffix = (propName: string) => `${propName}.AntdProps`

export const getAntdPropsNames = () =>
  getDirectories(COMPONENTS_ROOT_PATH)
    .map((v) => camelCase(v))
    .map((v) => capitalize(v))
    .map(addPropsSuffix)
