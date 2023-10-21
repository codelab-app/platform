import type { IAppDTO } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { userDto } from './user.data'

export const appDto: IAppDTO = {
  id: v4(),
  name: 'Codelab App',
  owner: userDto,
}
