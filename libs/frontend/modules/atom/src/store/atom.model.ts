import { tagRef } from '@codelab/frontend/modules/tag'
import { InterfaceType, typeRef } from '@codelab/frontend/modules/type'
import type {
  IAtom,
  IAtomDTO,
  IAtomType,
  ITag,
} from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import { customTextInjectionWhiteList } from './custom-text-injection-whitelist'

const hydrate = (atom: IAtomDTO) => {
  return new Atom({
    id: atom.id,
    name: atom.name,
    type: atom.type,
    api: typeRef(atom.api.id) as Ref<InterfaceType>,
    tags: atom.tags.map((tag) => tagRef(tag.id)),
  })
}

@model('@codelab/Atom')
export class Atom
  extends Model({
    id: idProp,
    name: prop<string>(),
    type: prop<IAtomType>(),
    tags: prop<Array<Ref<ITag>>>(),
    api: prop<Ref<InterfaceType>>(),
  })
  implements IAtom
{
  /**
   * Determines whether the atom accepts children and text make sense for the type.
   */
  @computed
  get allowCustomTextInjection(): boolean {
    return customTextInjectionWhiteList.indexOf(this.type) > -1
  }

  @modelAction
  updateCache(atom: IAtomDTO) {
    this.name = atom.name
    this.type = atom.type
    this.api = typeRef(atom.api.id) as Ref<InterfaceType>
    this.tags = atom.tags.map((tag) => tagRef(tag.id))
  }

  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  static hydrate = hydrate
}

export const atomRef = rootRef<Atom>('@codelab/AtomRef', {
  onResolvedValueChange(ref, newAtom, oldAtom) {
    if (oldAtom && !newAtom) {
      detach(ref)
    }
  },
})
