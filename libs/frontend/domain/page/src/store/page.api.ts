import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../graphql'

export const pageApi = getSdk(client)
