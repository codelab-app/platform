import { antdAtoms, antdPropsCustomizer } from './antdAtoms'
import { codelabAtoms } from './codelabAtoms'
import { htmlAtoms, htmlPropsCustomizer } from './htmlAtoms'
import { muiAtoms } from './muiAtoms'
import { AtomPropsCustomizer, AtomsRecord } from './types'

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
const propsCustomizerArray: Array<AtomPropsCustomizer> = [
  antdPropsCustomizer,
  htmlPropsCustomizer,
]

/**
 * merge atom maps to into one single object
 */
export const atoms: AtomsRecord = Object.assign({}, ...atomsArray)

/**
 * merge propsCustomizer maps to into one single object
 */
export const atomPropsCustomizer: AtomPropsCustomizer = Object.assign(
  {},
  ...propsCustomizerArray,
)
