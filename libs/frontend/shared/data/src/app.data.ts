import type { ICreateAppData } from '@codelab/frontend/abstract/core'
import { v4 } from 'uuid'

export const createAppData: ICreateAppData = {
  id: v4(),
  name: 'Demo App',
  owner: { auth0Id: v4() },
}
