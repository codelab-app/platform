import {
  PluginFunction,
  PluginValidateFn,
  Types,
} from '@graphql-codegen/plugin-helpers'
import { LoadedFragment } from '@graphql-codegen/visitor-plugin-common'
import {
  concatAST,
  DocumentNode,
  FragmentDefinitionNode,
  GraphQLSchema,
  Kind,
  visit,
} from 'graphql'
import { extname } from 'path'
import { RTKQueryRawPluginConfig } from './config'
import { RTKQueryVisitor } from './visitor'

export const plugin: PluginFunction<
  RTKQueryRawPluginConfig,
  Types.ComplexPluginOutput
> = (
  schema: GraphQLSchema,
  documents: Array<Types.DocumentFile>,
  config: RTKQueryRawPluginConfig,
) => {
  const allAst = concatAST(documents.map((v) => v.document as DocumentNode))

  const allFragments: Array<LoadedFragment> = [
    ...(
      allAst.definitions.filter(
        (d) => d.kind === Kind.FRAGMENT_DEFINITION,
      ) as Array<FragmentDefinitionNode>
    ).map((fragmentDef) => ({
      node: fragmentDef,
      name: fragmentDef.name.value,
      onType: fragmentDef.typeCondition.name.value,
      isExternal: false,
    })),
    ...(config.externalFragments || []),
  ]

  const visitor = new RTKQueryVisitor(schema, allFragments, config, documents)
  const visitorResult = visit(allAst, { leave: visitor })

  return {
    prepend: visitor.getImports(),
    content: [
      visitor.fragments,
      ...visitorResult.definitions.filter((t: any) => typeof t === 'string'),
      visitor.getInjectCall(),
    ].join('\n'),
  }
}

export const validate: PluginValidateFn<any> = async (
  schema: GraphQLSchema,
  documents: Array<Types.DocumentFile>,
  config: RTKQueryRawPluginConfig,
  outputFile: string,
) => {
  if (extname(outputFile) !== '.ts' && extname(outputFile) !== '.tsx') {
    throw new Error(
      `Plugin "typescript-rtk-query" requires extension to be ".ts" or ".tsx"!`,
    )
  }

  if (!config.importBaseApiFrom) {
    throw new Error(
      `You must specify the "importBaseApiFrom" option to use the RTK Query plugin!` +
        JSON.stringify(config),
    )
  }
}

export { RTKQueryVisitor }
