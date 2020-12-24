import { join, resolve } from 'path'
import { clearFile, createDir } from './fs-utils'
import { buildGenerator, generateJsonSchemas } from './json-schema-generator'

const outputRoot = resolve(
  `./libs/alpha/ui/component/src/form/graph/json-schemas/`,
)
const schemasFilePath = join(outputRoot, `schemas.ts`)
const tjsRoot = resolve('./libs/alpha/ui/antd/src/components/index.ts')

createDir(outputRoot)
clearFile(schemasFilePath)

generateJsonSchemas(buildGenerator(tjsRoot), schemasFilePath)
