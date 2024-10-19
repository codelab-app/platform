import type { IMapper } from '@codelab/frontend/abstract/domain'
import type {
  ICreateElementData,
  IElementCreateDto,
  IElementDto,
} from '@codelab/shared/abstract/core'
import type {
  ElementCreateInput,
  ElementDeleteInput,
  ElementUpdateInput,
} from '@codelab/shared/infra/gql'

export class ElementMapper
  implements
    IMapper<
      IElementCreateDto,
      ElementCreateInput,
      ElementUpdateInput,
      ElementDeleteInput
    >
{
  toCreateInput(data: IElementCreateDto): ElementCreateInput {
    return {}
  }
}
