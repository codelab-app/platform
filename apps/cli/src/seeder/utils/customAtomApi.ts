import { AtomType } from '@codelab/shared/abstract/core'
import { BaseTypeName } from '../data/baseTypes'
import { SeedFieldInput, SeedTypeInput } from '../models/types/type'

export type CustomAtomApiDefinition = {
  atomType: AtomType
  fields: Array<Omit<SeedFieldInput, 'interfaceId'>>
}

export type CustomAtomApiFactory = (
  input: CustomAtomApiFactoryInput,
) => Promise<CustomAtomApiDefinition>

export interface CustomAtomApiFactoryInput {
  baseTypeIdsByName: Map<BaseTypeName, string>
  createTypeIfMissing: (typeInput: SeedTypeInput) => Promise<string>
  createFieldIfMissing: (fieldInput: SeedFieldInput) => Promise<string>
}
