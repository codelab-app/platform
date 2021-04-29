import { sample } from 'lodash'
import { Atom_Type_Enum } from '@codelab/hasura'

export const randomAtomType = () =>
  sample(Object.values(Atom_Type_Enum)) as Atom_Type_Enum
