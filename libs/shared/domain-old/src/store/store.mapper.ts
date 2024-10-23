import type { IMapper, IStoreDto } from '@codelab/shared/abstract/core'
import type {
  StoreCreateInput,
  StoreDeleteInput,
  StoreUpdateInput,
} from '@codelab/shared/infra/gql'

import { connectNodeId } from '../orm'

export const storeMapper: IMapper<
  IStoreDto,
  StoreCreateInput,
  StoreUpdateInput,
  StoreDeleteInput
> = {
  toCreateInput: ({ api, id, name }: IStoreDto): StoreCreateInput => {
    return {
      api: connectNodeId(api.id),
      id,
      name,
    }
  },
  toDeleteInput: (): StoreDeleteInput => {
    return {
      actions: {
        ApiAction: [{ where: {} }],
        CodeAction: [{ where: {} }],
      },
      api: {
        where: {},
      },
    }
  },
  toUpdateInput: ({ name }: IStoreDto): StoreUpdateInput => {
    return { name }
  },
}
