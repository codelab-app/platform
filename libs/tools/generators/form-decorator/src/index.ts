import { generateSchemas, writeSchemasToFile } from './processors'

export const generateSchema = (target: Function, filePath: string) => {
  writeSchemasToFile(generateSchemas(target), filePath)
}

export { generateSchemas }
export * from './decorators'
export * from './processors'

// writeSchemasToFile(generateSchemas(User), filePath)
// writeSchemasToFile(generateSchemas(Shipping), filePath)

// const schemas = generateSchemas(Shipping)
// const schema = getJsonSchema(User)
