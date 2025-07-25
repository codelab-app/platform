import { ESLintUtils } from '@typescript-eslint/utils'

export const createESLintRule = ESLintUtils.RuleCreator(() => '')

export const antDesignIconImport = createESLintRule({
  create: (context) => {
    return {
      ImportDeclaration: (node) => {
        const importSourceValue = node.source.value

        if (importSourceValue.endsWith('@ant-design/icons')) {
          context.report({
            messageId: 'iconImportPath',
            node,
          })
        }
      },
    }
  },
  defaultOptions: [],
  meta: {
    docs: {
      description: 'Disallow import of icons from barrel',
    },
    messages: {
      iconImportPath: 'Must import individual icons',
    },
    schema: [],
    type: 'problem',
  },
  name: 'ant-design-icon-import',
})
