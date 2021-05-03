import { Atom_Type_Enum } from '@codelab/hasura'
import { sample } from 'lodash'

export const randomAtomType = () =>
  sample(Object.values(Atom_Type_Enum)) as Atom_Type_Enum
