import {
  createFormatter,
  createParser,
  createProgram,
  SchemaGenerator,
} from 'ts-json-schema-generator'
import { CustomTjsgParser } from './custom-tjsg-parser'
import { config } from './parse-html'

export const parseCustomHtml = () => {
  const program = createProgram(config)

  // We configure the parser an add our custom parser to it.
  const parser = createParser(program, config, (prs) => {
    prs.addNodeParser(new CustomTjsgParser())
  })

  const formatter = createFormatter(config)
  const generator = new SchemaGenerator(program, parser, formatter, config)
  const schema = generator.createSchema(config.type)
  const schemaString = JSON.stringify(schema, null, 2)

  console.log(schemaString)

  // fs.writeFile(output_path, schemaString, (err) => {
  //   if (err) {
  //     throw err
  //   }
  // })
}
