import type { IComponentDto, IMapper } from '@codelab/shared/abstract/core'
import type {
  ComponentCreateInput,
  ComponentDeleteInput,
  ComponentUpdateInput,
} from '@codelab/shared/infra/gql'

import { ITypeKind } from '@codelab/shared/abstract/core'

import { connectNodeId, connectOwner } from '../orm'
import { propMapper } from '../prop'
import { storeMapper } from '../store'
import { typeMapper } from '../type'

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
      compositeKey: `${owner.id}-${name}`,
      id,
      owner: connectOwner(owner),
      props: {
        connectOrCreate: {
          onCreate: { node: propMapper.toCreateInput(props) },
          where: { node: { id: props.id } },
        },
      },
      rootElement: connectNodeId(rootElement.id),
      store: connectNodeId(store.id),
    }
  },

  toDeleteInput: (): ComponentDeleteInput => {
    return {
      api: {
        delete: typeMapper.toDeleteInput(ITypeKind.InterfaceType),
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
    props,
    rootElement,
    store,
  }: IComponentDto): ComponentUpdateInput => {
    return {
      api: connectNodeId(api.id),
      props: connectNodeId(props.id),
      rootElement: connectNodeId(rootElement.id),
      store: connectNodeId(store.id),
    }
  },
}
