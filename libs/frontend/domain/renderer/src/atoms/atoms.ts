import { IAtomType } from '@codelab/frontend/abstract/core'
import { antdAtoms, antdPropsCustomizer } from './antdAtoms'
import { codelabAtoms } from './codelabAtoms'
import { htmlAtoms, htmlPropsCustomizer } from './htmlAtoms'
import { muiAtoms, muiPropsCustomizer } from './muiAtoms'
import { AtomCustomizer, AtomsRecord, IComponentType } from './types'

// Add new atom records here
const allAtoms: AtomsRecord = {
  ...htmlAtoms,
  ...codelabAtoms,
  ...antdAtoms,
  ...muiAtoms,
}

export { antdAtoms, codelabAtoms, htmlAtoms, muiAtoms }

/**
 * Add a customizers here if you want to modify or add props to a specific element type
 */
export const allPropsCustomizer: AtomCustomizer = {
  ...antdPropsCustomizer,
  ...htmlPropsCustomizer,
  ...muiPropsCustomizer,
}

/**
 * merge atom maps to into one single object
 *
 */
export const getAtom = (atomType: IAtomType): IComponentType | undefined =>
  allAtoms[atomType]
