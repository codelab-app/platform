import type { IMapper } from '@codelab/frontend/abstract/domain'
import type { IStoreCreateDto, IStoreDto } from '@codelab/shared/abstract/core'
import type {
  ElementDeleteInput,
  ElementUpdateInput,
  StoreCreateInput,
  StoreDeleteInput,
  StoreUpdateInput,
} from '@codelab/shared/infra/gql'

export class StoreMapper
  implements
    IMapper<
      IStoreCreateDto,
      StoreCreateInput,
      ElementUpdateInput,
      ElementDeleteInput
    >
{
  toCreateInput({ api, id, name }: IStoreDto): StoreCreateInput {
    return {
      api: { create: { node: api.toCreateInput() } },
      id,
      name,
    }
  }

  toDeleteInput(): StoreDeleteInput {
    return {
      actions: {
        ApiAction: [{ where: {} }],
        CodeAction: [{ where: {} }],
      },
      api: { delete: InterfaceType.toDeleteInput(), where: {} },
    }
  }

  toUpdateInput({ name }: IStoreDto): StoreUpdateInput {
    return { name }
  }
}
