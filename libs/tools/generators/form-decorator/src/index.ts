import { generateSchemas, writeSchemasToFile } from './processors'

export const generateSchema = (target: Function, filePath: string) => {
  writeSchemasToFile(generateSchemas(target), filePath)
}

export { generateSchemas }

// writeSchemasToFile(generateSchemas(User), filePath)
// writeSchemasToFile(generateSchemas(Shipping), filePath)

// const schemas = generateSchemas(Shipping)
// const schema = getJsonSchema(User)
