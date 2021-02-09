import { antdPropsInput } from './generator/generator-config'
import { generateJSONSchemaString } from './generator/generator-json'
import { formatContentForExport, lintFiles, saveToFile } from './utils'

/**
 * Generate Antd props first
 */
generateJSONSchemaString(antdPropsInput)
  .then(formatContentForExport)
  .then(
    saveToFile(
      `${process.cwd()}/libs/generated/src/jsonSchema-antd.generated.ts`,
    ),
  )
  .then((outputPath: string) => {
    console.log(`Saving generated schema to... ${outputPath}`)

    return lintFiles([outputPath])
  })
  .catch((err) => console.log(err))

// /**
//  * Then generate schema that depends on Antd props
//  */
// await generateJSONSchemaString(propsInput)
//   .then(formatContentForExport)
//   .then(
//     saveToFile(
//       `${process.cwd()}/libs/generated/src/jsonSchema-props.generated.ts`,
//     ),
//   )
//   .then((outputPath: string) => {
//     console.log(`Saving generated schema to... ${outputPath}`)

//     return lintFiles([outputPath])
//   })
//   .catch((err) => console.log(err))

// /**
//  * Then finally our use case types
//  */
// await generateJSONSchemaString(useCaseInputs)
//   .then(formatContentForExport)
//   .then(
//     saveToFile(
//       `${process.cwd()}/libs/generated/src/jsonSchema-useCases.generated.ts`,
//     ),
//   )
//   .then((outputPath: string) => {
//     console.log(`Saving generated schema to... ${outputPath}`)

//     return lintFiles([outputPath])
//   })
//   .catch((err) => console.log(err))
