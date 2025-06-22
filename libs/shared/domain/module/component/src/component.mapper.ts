import type { IComponentDto, IMapper } from '@codelab/shared-abstract-core'
import type {
  ComponentCreateInput,
  ComponentDeleteInput,
  ComponentUpdateInput,
} from '@codelab/shared-infra-gqlgen'

import { ITypeKind } from '@codelab/shared-abstract-core'
import { propMapper } from '@codelab/shared-domain-module-prop'
import { storeMapper } from '@codelab/shared-domain-module-store'
import { interfaceTypeMapper } from '@codelab/shared-domain-module-type'
import {
  connectNodeId,
  connectOwner,
  reconnectNodeId,
} from '@codelab/shared-domain-orm'
import { slugify } from '@codelab/shared-utils'

export const componentMapper: IMapper<
  IComponentDto,
  ComponentCreateInput,
  ComponentUpdateInput,
  ComponentDeleteInput
> = {
  toCreateInput: ({
    api,
    id,
    name,
    owner,
    props,
    rootElement,
    store,
  }: IComponentDto): ComponentCreateInput => {
    return {
      api: connectNodeId(api.id),
      compositeKey: `${owner.id}-${slugify(name)}`,
      id,
      owner: connectOwner(owner),
      props: {
        create: {
          node: propMapper.toCreateInput(props),
        },
      },
      rootElement: connectNodeId(rootElement.id),
      store: connectNodeId(store.id),
    }
  },

  toDeleteInput: (): ComponentDeleteInput => {
    return {
      api: {
        delete: interfaceTypeMapper.toDeleteInput(ITypeKind.InterfaceType),
        where: {},
      },
      props: { where: {} },
      rootElement: { where: {} },
      store: {
        delete: storeMapper.toDeleteInput(ITypeKind.InterfaceType),
        where: {},
      },
    }
  },

  toUpdateInput: ({
    api,
    name,
    owner,
    props,
    rootElement,
    store,
  }: IComponentDto): ComponentUpdateInput => {
    return {
      api: reconnectNodeId(api.id),
      compositeKey: `${owner.id}-${slugify(name)}`,
      props: reconnectNodeId(props.id),
      rootElement: reconnectNodeId(rootElement.id),
      store: reconnectNodeId(store.id),
    }
  },
}
