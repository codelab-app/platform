import type { Config } from 'ts-json-schema-generator'
import { createGenerator } from 'ts-json-schema-generator'

export const config: Config = {
  path: 'apps/cli/src/use-cases/parse/html.interface.ts',
  skipTypeCheck: true,
  topRef: false,
  tsconfig: 'apps/cli/tsconfig.vega.json',
  // 'all' | 'none' | 'export'
  // expose: 'none',
  // Or <type-name> if you want to generate schema for that one type only
  type: 'HtmlA',
}

const output_path = ''

export const parseHtml = () => {
  const schema = createGenerator(config).createSchema(config.type)
  const schemaString = JSON.stringify(schema, null, 2)

  console.log(schemaString)

  // fs.writeFile(output_path, schemaString, (err) => {
  //   if (err) {
  //     throw err
  //   }
  // })
}
