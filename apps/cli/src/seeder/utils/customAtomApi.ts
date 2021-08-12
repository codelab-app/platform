import {
  AtomType,
  CreateFieldInput,
  CreateTypeInput,
} from '@codelab/shared/codegen/graphql'
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
