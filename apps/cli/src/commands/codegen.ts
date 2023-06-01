import { codegen } from '@graphql-codegen/core'
import typescriptPlugin from '@graphql-codegen/typescript'
import typescriptGraphqlRequestPlugin from '@graphql-codegen/typescript-graphql-request'
import typescriptOperationsPlugin from '@graphql-codegen/typescript-operations'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadDocuments, loadSchema } from '@graphql-tools/load'
import { UrlLoader } from '@graphql-tools/url-loader'
import fs from 'fs'
import { parse, printSchema } from 'graphql'
import { join } from 'path'

export const graphqlCodegen = async () => {
  // Schema
  const schema = await loadSchema('http://127.0.0.1:3000/api/graphql', {
    loaders: [new UrlLoader()],
  })

  // const schema = await loadSchema('your-schema.graphql', {
  //   loaders: [new GraphQLFileLoader()],
  // })

  // Documents - this is an example, you might need to adjust according to your file structure
  const documentFiles: Array<string> = []

  fs.readdirSync('./').forEach((file) => {
    console.log(file)

    if (file.endsWith('.graphql')) {
      documentFiles.push(join(__dirname, file))
    }
  })

  const documents = await loadDocuments(documentFiles, {
    loaders: [new GraphQLFileLoader()],
  })

  console.log(documents)

  // Call the codegen function
  const output = await codegen({
    config: {
      defaultScalarType: 'unknown',
      gqlImport: 'graphql-tag#gql',
      inlineFragmentTypes: 'combine',
      namingConvention: {
        enumValues: 'keep',
      },
      scalars: {
        _Any: 'any',
        DateTime: 'string',
        Int64: 'number',
        JSON: 'Record<string, any>',
        JSONObject: 'Record<string, any>',
        uuid: 'string',
        Void: 'void',
      },
      skipTypename: true,
      strictScalars: true,
    },
    documents,
    filename: 'graphql.gen.ts',
    pluginMap: {
      typescript: typescriptPlugin,
      typescriptGraphqlRequest: typescriptGraphqlRequestPlugin,
      typescriptOperations: typescriptOperationsPlugin,
    },
    plugins: [
      { typescript: {} },
      { typescriptOperations: {} },
      { typescriptGraphqlRequestPlugin: {} },
    ],
    schema: parse(printSchema(schema)),
  })

  // Write output to a file
  // fs.writeFileSync('API.ts', output)
  // console.log(out)
}
