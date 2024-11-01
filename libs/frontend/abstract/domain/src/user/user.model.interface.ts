import type { IUser, IUserDto } from '@codelab/shared/abstract/core'

import type { IAppModel } from '../app'
import type { ICacheService, IModel } from '../shared'

export interface IUserModel
  extends ICacheService<IUserDto, IUserModel>,
    IModel<IUser>,
    IUserDto {
  setId(id: string): void
}
