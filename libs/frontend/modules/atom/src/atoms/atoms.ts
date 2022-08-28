import { IAtomType } from '@codelab/shared/abstract/core'
import { antdAtoms, antdPropsCustomizer } from './antdAtoms'
import { codelabAtoms } from './codelabAtoms'
import { htmlAtoms, htmlPropsCustomizer } from './htmlAtoms'
import { muiAtoms, muiPropsCustomizer } from './muiAtoms'
import { muiAtomRequiredProps } from './muiAtoms/muiRequiredProps'
import {
  AtomCustomizer,
  AtomRequiredProps,
  AtomsRecord,
  IComponentType,
} from './types'

// Add new atom records here
const allAtoms: AtomsRecord = {
  ...htmlAtoms,
  ...codelabAtoms,
  ...antdAtoms,
  ...muiAtoms,
}

const allRequiredProps: AtomRequiredProps = {
  ...muiAtomRequiredProps,
}

/**
 * Add a customizers here if you want to modify or add props to a specific element type
 */
export const allPropsCustomizer: AtomCustomizer = {
  ...antdPropsCustomizer,
  ...htmlPropsCustomizer,
  ...muiPropsCustomizer,
}

// TODO:
// - Fix circular dependency between element and renderer when importing getRequiredProps in element
// - Solve issue with MuiModal failing when adding 2 children
// - What if the type of the prop doesn't match the required type?
// - Find a way to present the failure message to the user when hovering over the element tree UI
// - Think of an alternative approach to getRequiredProps.. maybe catch the error and show a user friendly error message
// - Think about how to handle this in the future, when dynamically adding UI frameworks

export const getRequiredProps = (atomType: IAtomType): Array<string> =>
  allRequiredProps[atomType] ?? []

/**
 * merge atom maps to into one single object
 *
 */
export const getAtom = (atomType: IAtomType): IComponentType | undefined =>
  allAtoms[atomType]
