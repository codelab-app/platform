import * as path from 'path'
import * as glob from 'glob'

/**
 * Location where shared types are generated
 */
export const typesOutputPathAbsolute = `${process.cwd()}/types/types.generated`

/**
 * Location of all our graphql queries/mutations
 */
export const graphqlQueryPaths = [
  ...glob.sync(`${process.cwd()}/libs/modules/**/useCases/**/*.graphql`),
  // ...glob.sync(`${process.cwd()}/libs/modules/**/useCases/**/*.gql.ts`),
]

/**
 * These are shared across all graphql queries
 */
export const fragmentQueryPaths = [
  // ...glob.sync(`${process.cwd()}/libs/modules/**/domain/**/*.gql.ts`),
]

/**
 * Each generated gql file has a different relative import to the root types
 */
export const getPathToTypes = (currentPath: string) => {
  return `${path.relative(
    path.resolve(currentPath, '../'),
    typesOutputPathAbsolute,
  )}`
}
