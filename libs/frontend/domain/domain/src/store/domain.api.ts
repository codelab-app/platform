import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk } from '../graphql/domain.endpoints.graphql.gen'

export const domainApis = getSdk(client)
