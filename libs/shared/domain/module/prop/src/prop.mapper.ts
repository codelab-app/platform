import type { IMapper, IPropDto } from '@codelab/shared/abstract/core'
import type {
  PropCreateInput,
  PropUpdateInput,
} from '@codelab/shared/infra/gqlgen'

export const propMapper: IMapper<
  IPropDto,
  PropCreateInput,
  PropUpdateInput,
  unknown
> = {
  toCreateInput: ({ data, id }: IPropDto): PropCreateInput => {
    return { data, id }
  },

  toDeleteInput: () => {
    return {}
  },

  toUpdateInput: ({ data }: IPropDto): PropUpdateInput => {
    return { data }
  },
}
