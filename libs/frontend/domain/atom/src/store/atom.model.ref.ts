import type { IAtom, IComponent } from '@codelab/frontend/abstract/core'
import type { Ref } from 'mobx-keystone'
import { detach, rootRef } from 'mobx-keystone'

export const atomRef = rootRef<IAtom>('@codelab/AtomRef', {
  onResolvedValueChange: (ref, newAtom, oldAtom) => {
    if (oldAtom && !newAtom) {
      detach(ref)
    }
  },
})

export const isAtomModel = (
  atom: Ref<IAtom> | Ref<IComponent> | null,
): atom is Ref<IAtom> => {
  return atom?.$modelType === '@codelab/Atom'
}
