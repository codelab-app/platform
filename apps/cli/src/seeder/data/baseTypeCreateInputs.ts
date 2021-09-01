import { TypeKind } from '@codelab/shared/enums'
import { SeedTypeInput } from '../models'

export const baseTypeCreateInputs: Array<SeedTypeInput> = [
  {
    typeKind: TypeKind.LambdaType,
    name: 'Lambda',
  },
]
