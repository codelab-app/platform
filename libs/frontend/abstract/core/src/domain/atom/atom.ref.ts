import type { Ref } from 'mobx-keystone'
import { detach, rootRef } from 'mobx-keystone'
import type { IElementRenderType } from '../element'
import type { IAtom } from './atom.model.interface'

export const atomRef = rootRef<IAtom>('@codelab/AtomRef', {
  onResolvedValueChange: (ref, newAtom, oldAtom) => {
    if (oldAtom && !newAtom) {
      detach(ref)
    }
  },
})

/**
 * used for determining the renderType of an element
 */
export const isAtomInstance = (
  atom: IElementRenderType | null,
): atom is Ref<IAtom> => {
  return atom?.$modelType === '@codelab/AtomRef'
}
