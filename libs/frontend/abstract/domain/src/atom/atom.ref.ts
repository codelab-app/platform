import type { AnyModel, Ref } from 'mobx-keystone'
import { detach, isRefOfType, rootRef } from 'mobx-keystone'
import type { IAtomModel } from './atom.model.interface'

export const atomRef = rootRef<IAtomModel>('@codelab/AtomRef', {
  onResolvedValueChange: (ref, newAtom, oldAtom) => {
    if (oldAtom && !newAtom) {
      detach(ref)
    }
  },
})

export const isAtomRef = (ref: Ref<object>): ref is Ref<IAtomModel> =>
  isRefOfType(ref, atomRef)

export const isAtom = (instance: AnyModel): instance is IAtomModel => {
  return instance.$modelType === '@codelab/Atom'
}
