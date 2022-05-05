import { generate } from '@neo4j/graphql-ogm'
import { ESLint } from 'eslint'
import * as path from 'path'
import { getOgm } from './ogm'

export const generateOgmTypes = async () => {
  // Only generate types when you make a schema change
  const outFile = path.resolve(
    process.cwd(),
    'libs/shared/abstract/codegen',
    'src/ogm-types.gen.ts',
  )

  const data = await generate({
    ogm: await getOgm(),
    outFile,
  })

  /**
   * Save to abstract folder as well for exporting just the interfaces
   */
  // fs.writeFileSync(outFile, JSON.stringify(data))

  // const results = await getEslint().lintFiles(outFile)
  // await ESLint.outputFixes(results)

  console.info('OGM type generated!')
  // process.exit(0)
}

let eslint: ESLint
const getEslint = () => (eslint ??= new ESLint({ fix: true }))
