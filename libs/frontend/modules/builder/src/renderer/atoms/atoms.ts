import { antdAtoms } from './antdAtoms'
import { AtomsRecord } from './AtomFactory'
import { codelabAtoms } from './codelabAtoms'
import { htmlAtoms } from './htmlAtoms'
import { muiAtoms } from './muiAtoms'

// Add new atom records here
export const atoms: Array<AtomsRecord> = [
  htmlAtoms,
  codelabAtoms,
  antdAtoms,
  muiAtoms,
]
