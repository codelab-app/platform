import { AtomFactory } from './atomFactoryType'
import { atoms } from './atoms'

const allAtomsRecord = Object.assign({}, ...atoms)

/**
 * Returns a ReactComponent corresponding to the input AtomType
 * Returns null if a mapping is not found
 */
export const atomFactory: AtomFactory = (atomType) => {
  return allAtomsRecord[atomType] ?? null
}
