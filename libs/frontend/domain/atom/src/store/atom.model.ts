import type { IAtom, IInterfaceType, ITag } from '@codelab/frontend/abstract/core'
import { IAtomDTO } from '@codelab/frontend/abstract/core'
import { tagRef } from '@codelab/frontend/domain/tag'
import type { InterfaceType } from '@codelab/frontend/domain/type'
import { typeRef } from '@codelab/frontend/domain/type'
import type { IAtomType } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'
import { customTextInjectionWhiteList } from './custom-text-injection-whitelist'

const hydrate = (atom: IAtomDTO) => {
  return new Atom({
    id: atom.id,
    icon: atom.icon,
    name: atom.name,
    type: atom.type,
    api: typeRef(atom.api.id) as Ref<InterfaceType>,
    tags: atom.tags.map((tag) => tagRef(tag.id)),
    allowedChildren: atom.allowedChildren,
  })
}

@model('@codelab/Atom')
export class Atom
  extends Model({
    id: idProp,
    name: prop<string>(),
    icon: prop<string | null | undefined>(),
    type: prop<IAtomType>(),
    tags: prop<Array<Ref<ITag>>>(() => []),
    api: prop<Ref<IInterfaceType>>(),
    allowedChildren: prop<Array<Pick<IAtomDTO, 'id' | 'name'>>>(() => []),
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

  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  static hydrate = hydrate

  @modelAction
  writeCache(atom: IAtomDTO) {
    this.name = atom.name
    this.type = atom.type
    this.api = typeRef(atom.api.id) as Ref<InterfaceType>
    this.tags = atom.tags.map((tag) => tagRef(tag.id))
    this.icon = atom.icon
    this.allowedChildren = atom.allowedChildren

    return this
  }
}

export const atomRef = rootRef<IAtom>('@codelab/AtomRef', {
  onResolvedValueChange: (ref, newAtom, oldAtom) => {
    if (oldAtom && !newAtom) {
      detach(ref)
    }
  },
})
