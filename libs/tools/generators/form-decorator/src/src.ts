import * as path from 'path'
import { getJsonSchema } from '@tsed/schema'
import { User } from '../test/models/ArrayTypes/User'
import { GridWithTabs } from '../test/models/GridWithTabs'
import { Shipping } from '../test/models/Shipping/Shipping'
import { generateSchemas, writeSchemasToFile } from './processors'
import { getJsonSchemaCustom } from './processors/custom-tsed/getJsonSchemaCustom'

const filePath = path.join(
  __dirname,
  '..',
  '..',
  'react-jsf-custom-object-templates',
  'src',
)

writeSchemasToFile(generateSchemas(GridWithTabs), filePath)
// writeSchemasToFile(generateSchemas(User), filePath)
// writeSchemasToFile(generateSchemas(Shipping), filePath)

// const schemas = generateSchemas(Shipping)
// const schema = getJsonSchema(User)
