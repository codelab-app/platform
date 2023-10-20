/* eslint-disable @typescript-eslint/no-explicit-any */
import { normalizePath, workspaceRoot } from '@nx/devkit'
import { ESLintUtils } from '@typescript-eslint/utils'
import path from 'path'

export const createESLintRule = ESLintUtils.RuleCreator(() => ``)

export const domainLayerConstraint = createESLintRule({
  create: (context) => {
    const projectPath = normalizePath(
      (global as any).projectPath || workspaceRoot,
    )

    return {
      ImportDeclaration: (node) => {
        const importSourceValue = node.source.value as string

        if (importSourceValue.endsWith('.graphql.gen')) {
          const currentFilename = context.getFilename()

          // if (!currentFilename.endsWith('.api.ts')) {
          //   context.report({
          //     messageId: 'noCodegenImport',
          //     node,
          //   })
          // }
        }
      },
      Program: (node) => {
        const absoluteFilename = context.getFilename()
        // console.log(absoluteFilename, projectPath)
        const relativePath = path.relative(projectPath, absoluteFilename)

        // console.log(relativePath)

        /**
         * If we are in the domain layer, we cannot have `.graphql` files
         */
        if (
          ['libs/frontend/domain'].some((lib) =>
            relativePath.startsWith(lib),
          ) &&
          relativePath.endsWith('.graphql')
        ) {
          context.report({
            messageId: 'noGraphqlFiles',
            node,
          })
        }
      },
    }
  },
  defaultOptions: [],
  meta: {
    docs: {
      description:
        'Disallow .graphql files in project paths including "domain"',
      recommended: 'error',
    },
    messages: {
      noCodegenImport:
        'Only files ending with `.api.ts` can import from codegen files',
      noGraphqlFiles: 'Domain layer cannot have GraphQL files',
    },
    schema: [],
    type: 'problem',
  },
  name: 'domain-layer-constraint',
})
