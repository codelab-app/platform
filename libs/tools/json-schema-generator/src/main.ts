import { writeFileSync } from 'fs'
import { join, resolve } from 'path'
import { buildGenerator, generateJsonSchemas } from './generator'
import { COMPONENTS_ROOT_PATH } from './utils'

/**
 * Clears generated output each time, file must contain some export path otherwise error is thrown.
 */
const schemaOutputPath = resolve(__dirname, 'generated/index.ts')

writeFileSync(schemaOutputPath, '')

const tjsRoot = join(COMPONENTS_ROOT_PATH, 'index.ts')

generateJsonSchemas(buildGenerator(tjsRoot), schemaOutputPath)
