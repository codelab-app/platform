import { generate } from '@neo4j/graphql-ogm'
import { ESLint } from 'eslint'
import * as path from 'path'
import { getOgm } from './infra/ogm'

export const generateOgmTypes = async () => {
  // Only generate types when you make a schema change
  const outFile = path.resolve(
    process.cwd(),
    'apps/web/src/graphql',
    'ogm-types.gen.ts',
  )

  await generate({
    ogm: getOgm(),
    outFile,
  })

  const results = await getEslint().lintFiles(outFile)

  await ESLint.outputFixes(results)

  console.log('OGM type generated')
}

let eslint: ESLint
const getEslint = () => (eslint ??= new ESLint({ fix: true }))
