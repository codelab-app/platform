import path from 'path'

const cypherPaths = {}

/**
 * Dynamically generate the path depending on the env.
 *
 * For `test`, we don't copy cypher to assets folder, so we load from the source path
 *
 * For `prod`, we load from assets folder
 *
 * For `dev`, we could load from either
 *
 * @param dir Name of the module `type`, `app` etc
 * @param resource `mutations/save-type`, `queries/get-type` etc
 */
export const cypherPath = (dir: string, resource: string) => {
  if (process.env.NODE_ENV === 'test') {
    return path.resolve(__dirname, 'cypher', dir), 'mutations/save-type'
  }

  return path.resolve(__dirname, 'cypher', dir), 'mutations/save-type'
}
