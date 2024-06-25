/* eslint-disable @typescript-eslint/no-explicit-any */
import { normalizePath, workspaceRoot } from '@nx/devkit'
import { ESLintUtils } from '@typescript-eslint/utils'
import path from 'path'

export const createESLintRule = ESLintUtils.RuleCreator(() => '')

export const domainLayerConstraint = createESLintRule({
  create: (context) => {
    const projectPath = normalizePath(
      (global as any).projectPath || workspaceRoot,
    )

    return {
      ImportDeclaration: (node) => {
        const importSourceValue = node.source.value

        if (importSourceValue.endsWith('.graphql.gen')) {
          const currentFilename = context.getFilename()

          if (!currentFilename.endsWith('.api.ts')) {
            context.report({
              messageId: 'noCodegenImport',
              node,
            })
          }
        }
      },
      Program: (node) => {
        const absoluteFilename = context.getFilename()
        // console.log(absoluteFilename, projectPath)
        const relativePath = path.relative(projectPath, absoluteFilename)

        /**
         * If we are in the domain layer, we cannot have `.graphql` files
         *
         * Only application layer can have graphql files
         */

        if (relativePath.endsWith('.graphql')) {
          /**
           * If we have a `.graphql` file, it must end in `.fragment.graphql` or `.endpoints.graphql`
           */
          if (
            !relativePath.endsWith('.fragment.graphql') &&
            !relativePath.endsWith('.endpoints.graphql')
          ) {
            context.report({
              messageId: 'graphqlExtension',
              node,
            })
          }

          /**
           * `.endpoints.graphql` can only belong in application
           */
          if (
            relativePath.endsWith('.endpoints.graphql') &&
            !relativePath.startsWith('libs/frontend/application')
          ) {
            context.report({
              messageId: 'endpointGraphqlConstraint',
              node,
            })
          }

          /**
           * `.fragment.graphql` can only belong in domain
           */
          if (
            relativePath.endsWith('.fragment.graphql') &&
            !relativePath.startsWith('libs/frontend/abstract/domain')
          ) {
            context.report({
              messageId: 'fragmentGraphqlConstraint',
              node,
            })
          }
        }
      },
    }
  },
  defaultOptions: [],
  meta: {
    docs: {
      description:
        'Disallow .graphql files in project paths including "domain"',
      recommended: 'strict',
    },
    messages: {
      endpointGraphqlConstraint:
        '`.endpoints.graphql` can only belong in the application layer',
      fragmentGraphqlConstraint:
        '`.fragment.graphql` can only belong in the domain layer',
      graphqlExtension:
        '.graphql files must end in .fragment.graphql or .endpoint.graphql',
      noCodegenImport:
        'Only files ending with `.api.ts` can import from codegen files',
    },
    schema: [],
    type: 'problem',
  },
  name: 'domain-layer-constraint',
})
