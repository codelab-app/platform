import type {
  IAtom,
  IAtomDTO,
  IInterfaceType,
  ITag,
} from '@codelab/frontend/abstract/core'
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

@model('@codelab/Atom')
export class Atom
  extends Model({
    id: idProp,
    name: prop<string>(),
    icon: prop<string | null | undefined>(),
    type: prop<IAtomType>(),
    tags: prop<Array<Ref<ITag>>>(() => []),
    api: prop<Ref<IInterfaceType>>(),
    allowedChildren: prop<Array<Ref<IAtom>>>(() => []),
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
  // static hydrate = hydrate
  static create({
    id,
    icon,
    name,
    type,
    api,
    tags,
    allowedChildren,
  }: IAtomDTO) {
    return new Atom({
      id,
      icon,
      name,
      type,
      api: typeRef<IInterfaceType>(api.id),
      tags: tags.map((tag) => tagRef(tag.id)),
      allowedChildren: allowedChildren.map((child) => atomRef(child.id)),
    })
  }

  @modelAction
  writeCache({
    id,
    name,
    type,
    icon,
    tags = [],
    api,
    allowedChildren = [],
  }: Partial<IAtomDTO>) {
    this.name = name ?? this.name
    this.type = type ?? this.type
    this.api = api?.id ? typeRef<IInterfaceType>(api.id) : this.api
    this.tags = tags.map((tag) => tagRef(tag.id))
    this.icon = icon ?? this.icon
    this.allowedChildren = allowedChildren.map((child) => atomRef(child.id))

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
