import { IAtomType } from '@codelab/shared/abstract/core'
import { ObjectTyped } from 'object-typed'

const getAtomTypes = (prefix: string) =>
  ObjectTyped.entries(IAtomType)
    .filter(([keys, values]) => keys.includes(prefix))
    .map(([keys, values]) => values)

export const antdAtoms = getAtomTypes('AntDesign')

export const htmlAtoms = getAtomTypes('Html')

export const codelabAtoms = getAtomTypes('Codelab')

export const reactAtoms = getAtomTypes('React')
