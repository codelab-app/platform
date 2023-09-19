import type {
  IAtomModel,
  IInterfaceType,
  ITagModel,
} from '@codelab/frontend/abstract/core'
import {
  atomRef,
  getUserService,
  typeRef,
} from '@codelab/frontend/abstract/core'
import { tagRef } from '@codelab/frontend/domain/tag'
import {
  AtomCreateInput,
  AtomUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IAtomDTO, IAtomType } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import {
  connectNodeId,
  connectNodeIds,
  connectOwner,
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
    requiredParents: prop<Array<Ref<IAtomModel>>>(() => []),
    suggestedChildren: prop<Array<Ref<IAtomModel>>>(() => []),
    tags: prop<Array<Ref<ITagModel>>>(() => []),
    type: prop<IAtomType>(),
  })
  implements IAtomModel
{
  /**
   * Determines whether the atom accepts children and text make sense for the type.
   */
  @computed
  get allowCustomTextInjection(): boolean {
    return customTextInjectionWhiteList.indexOf(this.type) > -1
  }

  @computed
  get userService() {
    return getUserService(this)
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
    console.log(this.userService.user)

    return {
      api: {
        create: {
          node: {
            id: v4(),
            kind: ITypeKind.InterfaceType,
            name: `${this.name} API`,
            owner: connectOwner(this.userService.user),
          },
        },
      },
      externalCssSource: this.externalCssSource,
      externalJsSource: this.externalJsSource,
      externalSourceType: this.externalSourceType,
      id: this.id,
      name: this.name,
      owner: connectOwner(this.userService.user),
      tags: connectNodeIds(this.tags.map((tag) => tag.current.id)),
      type: this.type,
    }
  }

  @modelAction
  toUpdateInput(): AtomUpdateInput {
    return {
      api: this.api.id ? connectNodeId(this.api.id) : undefined,
      externalCssSource: this.externalCssSource,
      externalJsSource: this.externalJsSource,
      externalSourceType: this.externalSourceType,
      id: this.id,
      name: this.name,
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
