import type { Ref } from 'mobx-keystone'
import { detach, rootRef } from 'mobx-keystone'
import type { IElementRenderTypeModel } from '../element'
import type { IAtomModel } from './atom.model.interface'

export const atomRef = rootRef<IAtomModel>('@codelab/AtomRef', {
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
  atom: IElementRenderTypeModel | null,
): atom is Ref<IAtomModel> => {
  return atom?.$modelType === '@codelab/AtomRef'
}
