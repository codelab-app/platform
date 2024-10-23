import type {
  IMapper,
  IPropCreateDto,
  IPropDto,
  IUserDto,
} from '@codelab/shared/abstract/core'
import type {
  PropCreateInput,
  PropUpdateInput,
} from '@codelab/shared/infra/gql'

export const propMapper: IMapper<
  IPropDto,
  PropCreateInput,
  PropUpdateInput,
  unknown
> = {
  toCreateInput: ({ data, id }: IPropCreateDto): PropCreateInput => {
    return {
      data: JSON.stringify(data),
      id,
    }
  },

  toDeleteInput: () => {
    return {}
  },

  toUpdateInput: ({ data, id }: IPropDto): PropUpdateInput => {
    return {
      data: JSON.stringify(data),
    }
  },
}
