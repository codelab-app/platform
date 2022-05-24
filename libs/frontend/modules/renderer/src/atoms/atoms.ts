import { IAtomType } from '@codelab/shared/abstract/core'
import { antdAtoms, antdPropsCustomizer } from './antdAtoms'
import { codelabAtoms } from './codelabAtoms'
import { htmlAtoms, htmlPropsCustomizer } from './htmlAtoms'
import { muiAtoms } from './muiAtoms'
import {
  AtomCustomizer,
  AtomsRecord,
  IComponentType,
  ModuleMapperFn,
} from './types'

// Add new atom records here
const atomsArray: Array<AtomsRecord> = [
  htmlAtoms,
  codelabAtoms,
  antdAtoms,
  muiAtoms,
]

/**
 * Add a customizers here if you want to modify or add props to a specific element type
 */
const propsCustomizerArray: Array<AtomCustomizer> = [
  antdPropsCustomizer,
  htmlPropsCustomizer,
]

/**
 * merge atom maps to into one single object
 *
 */
export const getAtom = (
  atomType: IAtomType,
  moduleMapper?: ModuleMapperFn,
): IComponentType => Object.assign({}, ...atomsArray)[atomType](moduleMapper)

/**
 * merge propsCustomizer maps to into one single object
 */
export const atomPropsCustomizer: AtomCustomizer = Object.assign(
  {},
  ...propsCustomizerArray,
)
