import { graphqlClient } from '@codelab/frontend/infra/graphql'
import { getSdk } from '../graphql'

export const propApi = getSdk(graphqlClient)
