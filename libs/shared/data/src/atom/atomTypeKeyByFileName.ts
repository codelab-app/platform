import type { IAtomType } from '@codelab/shared/abstract/core'
import { antdAtomData, reactAtomData } from '.'

interface AtomTypeKeyByFileName {
  [fileName: string]: IAtomType
}

/**
 * Used for CSV file mapping to atomType
 */
export const atomTypeKeyByFileName: AtomTypeKeyByFileName = Object.entries({
  ...antdAtomData,
  ...reactAtomData,
}).reduce(
  (record, [atomType, atom]) => ({ ...record, [atom.file ?? '']: atomType }),
  {},
)
