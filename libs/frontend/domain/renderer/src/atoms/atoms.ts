import type { IAtomRendererRecord } from '@codelab/frontend/abstract/core'
import type { IAtomType, IComponentType } from '@codelab/shared/abstract/core'
import { antdAtoms, antdPropsCustomizer } from './antd'
import { codelabAtoms } from './codelab'
import { customAtoms } from './custom'
import { htmlAtoms } from './html'
import { muiAtoms, muiPropsCustomizer } from './mui'
import { reactAtoms, reactPropsCustomizer } from './react'
import type { AtomCustomizer } from './types'

// Add new atom records here
export const allAtoms: IAtomRendererRecord = {
  ...htmlAtoms,
  ...codelabAtoms,
  ...antdAtoms,
  ...muiAtoms,
  ...reactAtoms,
  ...customAtoms,
}

export { antdAtoms, codelabAtoms, customAtoms, htmlAtoms, muiAtoms, reactAtoms }

/**
 * Add a customizers here if you want to modify or add props to a specific element type
 */
export const allPropsCustomizer: AtomCustomizer = {
  ...antdPropsCustomizer,
  ...reactPropsCustomizer,
  ...muiPropsCustomizer,
}

/**
 * merge atom maps to into one single object
 *
 */
export const getAtom = (atomType: IAtomType): IComponentType | undefined =>
  allAtoms[atomType]
