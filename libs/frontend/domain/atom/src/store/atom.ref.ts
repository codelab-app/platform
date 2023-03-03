import type { IAtom, IElementRenderType } from '@codelab/frontend/abstract/core'
import type { Ref } from 'mobx-keystone'
import { detach, rootRef } from 'mobx-keystone'

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
  return atom?.$modelType === '@codelab/Atom'
}
