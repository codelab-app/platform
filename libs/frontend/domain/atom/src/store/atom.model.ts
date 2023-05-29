import type {
  IAtom,
  IInterfaceType,
  ITag,
} from '@codelab/frontend/abstract/core'
import { atomRef, typeRef } from '@codelab/frontend/abstract/core'
import { tagRef } from '@codelab/frontend/domain/tag'
import {
  AtomCreateInput,
  AtomUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type {
  IAtomDTO,
  IAtomType,
  IAuth0Owner,
} from '@codelab/shared/abstract/core'
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
import { customTextInjectionWhiteList } from './custom-text-injection-whitelist'

const create = ({
  api,
  externalCssSource,
  externalJsSource,
  externalSourceType,
  icon,
  id,
  name,
  owner,
  requiredParents,
  suggestedChildren,
  tags,
  type,
}: IAtomDTO) => {
  return new Atom({
    api: typeRef<IInterfaceType>(api.id),
    externalCssSource,
    externalJsSource,
    externalSourceType,
    icon,
    id,
    name,
    owner,
    requiredParents: requiredParents?.map((child) => atomRef(child.id)),
    suggestedChildren: suggestedChildren?.map((child) => atomRef(child.id)),
    tags: tags?.map((tag) => tagRef(tag.id)),
    type,
  })
}

@model('@codelab/Atom')
export class Atom
  extends Model({
    api: prop<Ref<IInterfaceType>>(),
    externalCssSource: prop<string | null | undefined>(),
    externalJsSource: prop<string | null | undefined>(),
    externalSourceType: prop<string | null | undefined>(),
    icon: prop<string | null | undefined>(null),
    id: idProp,
    name: prop<string>(),
    owner: prop<IAuth0Owner>(),
    requiredParents: prop<Array<Ref<IAtom>>>(() => []),
    suggestedChildren: prop<Array<Ref<IAtom>>>(() => []),
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
    api,
    externalCssSource,
    externalJsSource,
    externalSourceType,
    icon,
    id,
    name,
    requiredParents = [],
    suggestedChildren = [],
    tags = [],
    type,
  }: Partial<IAtomDTO>) {
    this.externalCssSource = externalCssSource ?? this.externalCssSource
    this.externalJsSource = externalJsSource ?? this.externalJsSource
    this.externalSourceType = externalSourceType ?? this.externalSourceType
    this.name = name ?? this.name
    this.type = type ?? this.type
    this.api = api?.id ? typeRef<IInterfaceType>(api.id) : this.api
    this.tags = tags.map((tag) => tagRef(tag.id))
    this.icon = icon ?? this.icon
    this.suggestedChildren = suggestedChildren.map((child) => atomRef(child.id))
    this.requiredParents = requiredParents.map((child) => atomRef(child.id))

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
      externalCssSource: this.externalCssSource,
      externalJsSource: this.externalJsSource,
      externalSourceType: this.externalSourceType,
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
      externalCssSource: this.externalCssSource,
      externalJsSource: this.externalJsSource,
      externalSourceType: this.externalSourceType,
      id: this.id,
      name: this.name,
      owner: connectAuth0Owner(this.owner),
      requiredParents: reconnectNodeIds(
        this.requiredParents.map((parent) => parent.current.id),
      ),
      suggestedChildren: reconnectNodeIds(
        this.suggestedChildren.map((child) => child.current.id),
      ),
      tags: reconnectNodeIds(this.tags.map((tag) => tag.current.id)),
      type: this.type,
    }
  }
}
