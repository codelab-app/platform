import type {
  IAtom,
  IAtomDTO,
  IAuth0Owner,
  IInterfaceType,
  ITag,
} from '@codelab/frontend/abstract/core'
import { tagRef } from '@codelab/frontend/domain/tag'
import { typeRef } from '@codelab/frontend/domain/type'
import {
  AtomCreateInput,
  AtomUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IAtomType } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import {
  connectAuth0Owner,
  connectNodeId,
  connectNodeIds,
  reconnectNodeIds,
} from '@codelab/shared/domain/mapper'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import { v4 } from 'uuid'
import { atomRef } from './atom.ref'
import { customTextInjectionWhiteList } from './custom-text-injection-whitelist'

const create = ({
  id,
  icon,
  name,
  type,
  owner,
  api,
  tags,
  allowedChildren,
}: IAtomDTO) => {
  return new Atom({
    allowedChildren: allowedChildren?.map((child) => atomRef(child.id)),
    api: typeRef<IInterfaceType>(api.id),
    icon,
    id,
    name,
    owner,
    tags: tags?.map((tag) => tagRef(tag.id)),
    type,
  })
}

@model('@codelab/Atom')
export class Atom
  extends Model({
    allowedChildren: prop<Array<Ref<IAtom>>>(() => []),
    api: prop<Ref<IInterfaceType>>(),
    icon: prop<string | null | undefined>(null),
    id: idProp,
    name: prop<string>(),
    owner: prop<IAuth0Owner>(),
    tags: prop<Array<Ref<ITag>>>(() => []),
    type: prop<IAtomType>(),
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
  @modelAction
  static create = create

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

  @modelAction
  toCreateInput(): AtomCreateInput {
    return {
      api: {
        create: {
          node: {
            id: v4(),
            kind: ITypeKind.InterfaceType,
            name: `${this.name}  API`,
            owner: connectAuth0Owner(this.owner),
          },
        },
      },
      id: this.id,
      name: this.name,
      owner: connectAuth0Owner(this.owner),
      tags: connectNodeIds(this.tags.map((tag) => tag.current.id)),
      type: this.type,
    }
  }

  @modelAction
  toUpdateInput(): AtomUpdateInput {
    return {
      api: connectNodeId(this.api.id),
      id: this.id,
      name: this.name,
      owner: connectAuth0Owner(this.owner),
      tags: reconnectNodeIds(this.tags.map((tag) => tag.current.id)),
      type: this.type,
    }
  }
}
