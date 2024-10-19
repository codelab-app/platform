import type { IMapper } from '@codelab/frontend/abstract/domain'
import type { IPropDto, IUserDto } from '@codelab/shared/abstract/core'
import type {
  PropCreateInput,
  PropUpdateInput,
} from '@codelab/shared/infra/gql'

export class PropMapper
  implements IMapper<IPropDto, PropCreateInput, PropUpdateInput, void>
{
  constructor(private owner: IUserDto) {}

  toCreateInput({ data, id }: IPropDto): PropCreateInput {
    return {
      data,
      id,
    }
  }

  toDeleteInput() {
    return
  }

  toUpdateInput({ data }: IPropDto): PropUpdateInput {
    return {
      data,
    }
  }
}
