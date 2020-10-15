import * as fs from 'fs'
import * as path from 'path'

/**
 * When we serve `apps/api`, it actually compiles all `libs/api` into a single js file into `dist` then serves from there.
 *
 * Only `apps/api/src/assets` is built, so our `schema.graphql` is loaded there.
 */
const schemaPath = path.resolve(__dirname, './assets/schema.graphql')

/**
 * We are loading this invalid as a string, which will be merged with neo4j provided typeDefs using `makeAugmentedSchema`.
 *
 * If we load using `loadTypedefsSync`, it will throw error for incomplete types.
 */
export const typeDefs = fs.readFileSync(schemaPath, 'utf8')
