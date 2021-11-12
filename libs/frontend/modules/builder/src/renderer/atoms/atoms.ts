import { antdAtoms } from './antdAtoms'
import { AtomsRecord } from './atomFactoryType'
import { codelabAtoms } from './codelabAtoms'
import { htmlAtoms } from './htmlAtoms'
import { muiAtoms } from './muiAtoms'
import { nextAtoms } from './nextAtoms'

// Add new atom records here
export const atoms: Array<AtomsRecord> = [
  htmlAtoms,
  codelabAtoms,
  antdAtoms,
  muiAtoms,
  nextAtoms,
]
