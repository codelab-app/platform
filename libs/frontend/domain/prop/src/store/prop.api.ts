import { client } from '@codelab/frontend/infra/graphql'
import { getSdk } from '../graphql'

export const propApi = getSdk(client)
