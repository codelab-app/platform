import type {
  IAuth0Owner,
  ICreateAppData,
} from '@codelab/frontend/abstract/core'
import { v4 } from 'uuid'

export const createAppData: (owner: IAuth0Owner) => ICreateAppData = (
  owner,
) => ({
  id: v4(),
  name: 'Demo App',
  owner,
})
