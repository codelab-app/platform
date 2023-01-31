import type { IAtomType } from '@codelab/shared/abstract/core'
import { atomsData } from './data'

interface AtomTypeKeyByFileName {
  [fileName: string]: IAtomType
}

/**
 * Used for CSV file mapping to atomType
 */
export const atomTypeKeyByFileName: AtomTypeKeyByFileName = Object.entries(
  atomsData,
).reduce(
  (record, [atomType, atom]) => ({ ...record, [atom.file ?? '']: atomType }),
  {},
)
