import { join, resolve } from 'path'
import { clearFile, createDir } from './fs-utils'
import { buildGenerator, generateJsonSchemas } from './json-schema-generator'

const outputRoot = resolve(`./libs/tools/json-schema-generator/src/generated/`)
const schemasFilePath = join(outputRoot, `index.ts`)
const tjsRoot = resolve('./libs/alpha/ui/antd/src/components/index.ts')

createDir(outputRoot)
clearFile(schemasFilePath)

generateJsonSchemas(buildGenerator(tjsRoot), schemasFilePath)
