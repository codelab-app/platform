import {
  CreateFieldInput,
  CreateTypeInput,
} from '@codelab/backend/modules/type'
import { AtomType } from '@codelab/shared/abstract/core'
import { BaseTypeName } from '../data/baseTypes'

export type CustomAtomApiDefinition = {
  atomType: AtomType
  fields: Array<Omit<CreateFieldInput, 'interfaceId'>>
}

export type CustomAtomApiFactory = (
  input: CustomAtomApiFactoryInput,
) => Promise<CustomAtomApiDefinition>

export interface CustomAtomApiFactoryInput {
  baseTypeIdsByName: Map<BaseTypeName, string>
  createTypeIfMissing: (typeInput: CreateTypeInput) => Promise<string>
  createFieldIfMissing: (fieldInput: CreateFieldInput) => Promise<string>
}
