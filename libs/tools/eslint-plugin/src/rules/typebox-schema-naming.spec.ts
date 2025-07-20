import tsParser from '@typescript-eslint/parser'
import { RuleTester } from '@typescript-eslint/rule-tester'

import { typeboxSchemaNaming } from './typebox-schema-naming'

const ruleTester = new RuleTester({
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
  },
})

describe('TypeboxSchemaNaming rule', () => {
  ruleTester.run('typebox-schema-naming', typeboxSchemaNaming, {
    invalid: [
      {
        code: `
      		import { Type } from '@sinclair/typebox'
      		const User = Type.Object({ name: Type.String() })
      	`,
        errors: [
          {
            messageId: 'suffixWithSchema',
          },
        ],
        name: 'Type + Variable',
      },
      {
        code: `
          import { Typebox } from '@codelab/shared/abstract/typebox'
      		const User = Typebox.Object({ name: Type.String() })
      	`,
        errors: [
          {
            messageId: 'suffixWithSchema',
          },
        ],
        name: 'Typebox + Variable',
      },
      // {
      //   code: `
      // 		import { Type } from '@sinclair/typebox'
      // 		const User = () => Type.Object({ name: Type.String() })
      // 	`,
      //   errors: [
      //     {
      //       messageId: 'suffixWithSchema',
      //     },
      //   ],
      //   name: 'Type + Function',
      // },
      // {
      //   code: `
      //     import { Typebox } from '@codelab/shared/abstract/typebox'
      // 		const User = () => Typebox.Object({ name: Type.String() })
      // 	`,
      //   errors: [
      //     {
      //       messageId: 'suffixWithSchema',
      //     },
      //   ],
      //   name: 'Typebox + Function',
      // },
    ],
    valid: [
      {
        code: 'const Product = Type.Object({ price: Type.Number() })',
        name: 'Type + No Suffix + No Import',
      },
      {
        code: 'const Product = Typebox.Object({ price: Type.Number() })',
        name: 'Typebox + No Suffix + No Import',
      },
      {
        code: `
      		import { Type } from '@sinclair/typebox'
      		const UserSchema = Type.Object({ name: Type.String() })
      	`,
        name: 'Type + Suffix + Import',
      },
      {
        code: `
          import { Typebox } from '@codelab/shared/abstract/typebox'
      		const UserSchema = Typebox.Object({ name: Type.String() })
      	`,
        name: 'Typebox + Suffix + Import',
      },
      {
        code: `
          import { Typebox } from '@codelab/shared/abstract/typebox'
          import { Type } from '@sinclair/typebox'

          const test = () => {
            return Type.String()
          }
        `,
        name: 'Unused Typebox + Function',
      },
    ],
  })
})
