import type {
  IComponentDto,
  IMapper,
  IUserDto,
} from '@codelab/shared/abstract/core'
import type {
  ComponentCreateInput,
  ComponentDeleteInput,
  ComponentUpdateInput,
} from '@codelab/shared/infra/gql'

import { connectNodeId, connectOwner } from '../orm'
import { storeMapper } from '../store'
import { typeMapper } from '../type'
import { ComponentProperties } from './component.properties'

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
      props: connectNodeId(props.id),
      rootElement: connectNodeId(rootElement.id),
      store: connectNodeId(store.id),
    }
  },

  toDeleteInput: (): ComponentDeleteInput => {
    return {
      api: { delete: typeMapper.toDeleteInput(), where: {} },
      props: { where: {} },
      rootElement: { where: {} },
      store: { delete: storeMapper.toDeleteInput(), where: {} },
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
