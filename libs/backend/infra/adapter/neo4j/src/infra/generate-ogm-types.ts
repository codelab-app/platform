import { generate } from '@neo4j/graphql-ogm'
import * as fs from 'fs'
import * as path from 'path'
import * as prettier from 'prettier'
import { getOgm } from './ogm'

export const generateOgmTypes = async () => {
  const outFile = path.resolve(
    process.cwd(),
    'libs/backend/abstract/codegen',
    'src/ogm-types.gen.ts',
  )

  const output = await generate({
    ogm: await getOgm(),
    outFile,
    noWrite: true,
  })
    .then((data) => {
      console.info('OGM type generated!')

      return data
    })
    .catch((e) =>
      console.error(`[generateOgmTypes] ${JSON.stringify(e, null, 2)}`),
    )

  // Get prettier config
  const options = await prettier.resolveConfig(outFile)

  // Format
  const formatted = prettier.format(`${output}`, {
    ...options,
    filepath: outFile,
  })

  /**
   * Save to abstract folder as well for exporting just the interfaces
   */
  fs.writeFileSync(outFile, formatted)
}
