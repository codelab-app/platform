import * as path from 'path'
import { getJsonSchema } from '@tsed/schema'
import { User } from '../test/models/ArrayTypes/User'
import { GridWithTabs } from '../test/models/GridWithTabs'
import { Shipping } from '../test/models/Shipping/Shipping'
import { generateSchemas, writeSchemasToFile } from './processors'
import { getJsonSchemaCustom } from './processors/custom-tsed/getJsonSchemaCustom'

interface GenerateSchemaProps {
  // Function to be generated
  target: Function
  // Output file location
  filePath: string
}

export const generateSchema = (props: GenerateSchemaProps) => {
  writeSchemasToFile(generateSchemas(props.target), props.filePath)
}

const filePath = path.join(__dirname)

generateSchema({
  target: GridWithTabs,
  filePath,
})
