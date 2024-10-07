import type {
  IAtomModel,
  IInterfaceTypeModel,
  ITagModel,
} from '@codelab/frontend/abstract/domain'
import type { IAtomDto, IAtomType } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'

import AntDesignOutlined from '@ant-design/icons/AntDesignOutlined'
import Html5Outlined from '@ant-design/icons/Html5Outlined'
import {
  atomRef,
  getUserDomainService,
  typeRef,
} from '@codelab/frontend/abstract/domain'
import { tagRef } from '@codelab/frontend-domain-tag/store'
import {
  IElementRenderTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import {
  connectNodeId,
  connectNodeIds,
  connectOwner,
  reconnectNodeIds,
} from '@codelab/shared/domain-old'
import { AtomCreateInput, AtomUpdateInput } from '@codelab/shared/infra/gql'
import {
  antdAtoms,
  codelabAtoms,
  htmlAtoms,
  reactAtoms,
} from '@codelab/shared-domain-module-atom'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import { createElement } from 'react'
import { v4 } from 'uuid'

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
}: IAtomDto) => {
  return new Atom({
    api: typeRef<IInterfaceTypeModel>(api.id),
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
    api: prop<Ref<IInterfaceTypeModel>>(),
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
  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  static create = create

  /**
   * Make it so we can match the interface
   */
  @computed
  get __typename() {
    return IElementRenderTypeKind.Atom as const
  }

  @computed
  get library() {
    const atomType = this.type

    return htmlAtoms.includes(atomType)
      ? {
          color: 'orange',
          icon: createElement(Html5Outlined),
          name: 'HTML',
        }
      : antdAtoms.includes(atomType)
      ? {
          color: 'geekblue',
          icon: createElement(AntDesignOutlined),
          name: 'Ant Design',
        }
      : codelabAtoms.includes(atomType)
      ? { color: 'yellow', name: 'Codelab' }
      : reactAtoms.includes(atomType)
      ? { color: 'green', name: 'React' }
      : atomType === 'ExternalComponent'
      ? { color: 'brown', name: 'External' }
      : { color: 'black', name: 'Unknown' }
  }

  @computed
  get toJson() {
    return {
      __typename: this.__typename,
      api: this.api,
      externalCssSource: this.externalCssSource,
      externalJsSource: this.externalJsSource,
      externalSourceType: this.externalSourceType,
      icon: this.icon,
      id: this.id,
      name: this.name,
      requiredParents: this.requiredParents,
      suggestedChildren: this.suggestedChildren,
      tags: this.tags,
      type: this.type,
    }
  }

  @modelAction
  toCreateInput(): AtomCreateInput {
    return {
      api: {
        create: {
          node: {
            id: v4(),
            kind: ITypeKind.InterfaceType,
            name: `${this.name} API`,
            owner: connectOwner(this.userDomainService.user),
          },
        },
      },
      externalCssSource: this.externalCssSource,
      externalJsSource: this.externalJsSource,
      externalSourceType: this.externalSourceType,
      id: this.id,
      name: this.name,
      owner: connectOwner(this.userDomainService.user),
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
  }: Partial<IAtomDto>) {
    this.externalCssSource = externalCssSource ?? this.externalCssSource
    this.externalJsSource = externalJsSource ?? this.externalJsSource
    this.externalSourceType = externalSourceType ?? this.externalSourceType
    this.name = name ?? this.name
    this.type = type ?? this.type
    this.api = api?.id ? typeRef<IInterfaceTypeModel>(api.id) : this.api
    this.tags = tags.map((tag) => tagRef(tag.id))
    this.icon = icon ?? this.icon
    this.suggestedChildren = suggestedChildren.map((child) => atomRef(child.id))
    this.requiredParents = requiredParents.map((child) => atomRef(child.id))

    return this
  }

  @computed
  private get userDomainService() {
    return getUserDomainService(this)
  }
}
