import { codegen } from '@graphql-codegen/core'
import * as typescriptPlugin from '@graphql-codegen/typescript'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadDocuments, loadSchema } from '@graphql-tools/load'
import { UrlLoader } from '@graphql-tools/url-loader'
import fs from 'fs'
import globby from 'globby'
import { parse, printSchema } from 'graphql'

/**
 *
 * @param sourceRoot Use source root of lib to search for graphql documents
 */
export const graphqlCodegen = async (sourceRoot: string, libName: string) => {
  // Schema
  const schema = await loadSchema('http://127.0.0.1:3000/api/graphql', {
    loaders: [new UrlLoader()],
  })

  // const schema = await loadSchema('your-schema.graphql', {
  //   loaders: [new GraphQLFileLoader()],
  // })

  const documentFiles = globby.sync(`${sourceRoot}/**/*.graphql`, {
    gitignore: true,
  })

  console.log({ libName, sourceRoot })

  console.log({ documentFiles })

  // Documents - this is an example, you might need to adjust according to your file structure
  const documents = await loadDocuments(documentFiles, {
    loaders: [new GraphQLFileLoader()],
  })

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
      // typescriptOperations: typescriptOperationsPlugin,
      // typescriptGraphqlRequest: typescriptGraphqlRequestPlugin,
    },
    plugins: [
      { typescript: {} },
      // { typescriptOperations: {} },
      // { typescriptGraphqlRequestPlugin: {} },
    ],
    schema: parse(printSchema(schema)),
  })

  // Write output to a file
  fs.writeFileSync(`${libName}.ts`, output)
}
