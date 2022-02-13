import { generate, OGM } from '@neo4j/graphql-ogm'
import { ESLint } from 'eslint'
import * as path from 'path'
import { getDriver } from './getDriver'
import { ModelMap } from './ogm-types.gen'
import typeDefs from './typeDefs'

const ogm = new OGM<ModelMap>({ typeDefs, driver: getDriver() })

export const User = ogm.model('User')

export const Atom = ogm.model('Atom')

export const generateOgmTypes = async () => {
  // Only generate types when you make a schema change
  const outFile = path.resolve(
    process.cwd(),
    'apps/web/src/neo4j-graphql',
    'ogm-types.gen.ts',
  )

  await generate({
    ogm,
    outFile,
  })

  const results = await getEslint().lintFiles(outFile)

  await ESLint.outputFixes(results)
}

let eslint: ESLint
const getEslint = () => (eslint ??= new ESLint({ fix: true }))
