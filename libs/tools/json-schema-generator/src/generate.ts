import { join, resolve } from 'path'
import { clearFile, createDir } from './fs-utils'
import { generateRootIndex } from './generateRootIndex'
import { buildGenerator, generateJsonSchemas } from './json-schema-generator'

const generatedSchemasRoot = resolve(
  `./libs/tools/json-schema-generator/src/generated/`,
)
const schemasFilePath = join(generatedSchemasRoot, `index.ts`)

createDir(generatedSchemasRoot)
clearFile(schemasFilePath)

const tjsRoot = resolve('./libs/alpha/ui/antd/src/components/index.ts')

generateJsonSchemas(buildGenerator(tjsRoot), schemasFilePath)

const rootPath = resolve(`./libs/tools/json-schema-generator/src/`)
const rootIndexFile = join(rootPath, `index.ts`)

clearFile(rootIndexFile)
generateRootIndex(rootIndexFile)
