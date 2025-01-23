import type { IUserDto } from '@codelab/shared/abstract/core'
import type {
  UserFragment,
  UserOptions,
  UserWhere,
} from '@codelab/shared/infra/gqlgen'

import type { IRepository } from '../shared'

export type IUserRepository = IRepository<
  IUserDto,
  UserFragment,
  UserWhere,
  UserOptions
>
