import { TypeKind } from '@codelab/shared/abstract/core'
import { SeedTypeInput } from '../models'

export const baseTypeCreateInputs: Array<SeedTypeInput> = [
  {
    typeKind: TypeKind.LambdaType,
    name: 'Lambda',
  },
]
