import { Nullable } from '@codelab/shared/abstract/types'
import { IUserDTO } from './user.dto'
import { IUser } from './user.interface'

export interface IUserService {
  // users: ObjectMap<IUser>
  user: Nullable<IUser>
  setUser(user: IUserDTO): void
}
