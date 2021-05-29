import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import * as fs from 'fs'
import { print } from 'graphql'
import * as path from 'path'

/**
 * DGraph Schema
 *
 * This is the schema we want to append our `enum AtomType { ... }` to
 */
const dgraphSchemaPath = path.resolve(process.cwd(), 'dgraph/schema.graphql')

const dgraphSchema = loadFilesSync(dgraphSchemaPath, {
  extensions: ['graphql'],
})

/**
 * Codelab Schema
 *
 * This is the schema that we want to extract `enum AtomType { ... }` from
 */
const codelabApiSchemaPath = path.resolve(process.cwd(), 'schema.api.graphql')

const codelabSchema = loadFilesSync(codelabApiSchemaPath, {
  extensions: ['graphql'],
})

/**
 * Regex pattern to match `enum AtomType { ... }`
 */
const regex = /(?:enum)\sAtomType\s(.+?)\}/gs
const atomTypeTypeDef = codelabSchema[0].match(regex)
/**
 * Merge schemas together
 */
const mergedTypeDefs = mergeTypeDefs([...atomTypeTypeDef, ...dgraphSchema])
const transformedDgraphSchema = print(mergedTypeDefs)

fs.writeFileSync(
  path.resolve(process.cwd(), 'dgraph/schema.generated.graphql'),
  transformedDgraphSchema,
)
