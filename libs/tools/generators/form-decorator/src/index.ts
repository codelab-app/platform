import { generateSchemas } from './processors'

export { generateSchemas }
export * from './decorators'
export * from './processors'

// writeSchemasToFile(generateSchemas(User), filePath)
// writeSchemasToFile(generateSchemas(Shipping), filePath)

// const schemas = generateSchemas(Shipping)
// const schema = getJsonSchema(User)
