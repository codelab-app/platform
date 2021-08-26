import { CreateTypeInput, TypeKind } from '@codelab/shared/codegen/graphql'

export const baseTypeCreateInputs: Array<CreateTypeInput> = [
  {
    typeKind: TypeKind.LambdaType,
    name: 'Lambda',
  },
]
