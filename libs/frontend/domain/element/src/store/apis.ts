import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk as getElementSdk } from '../graphql/element.endpoints.graphql.gen'
import { getSdk as getHookSdk } from '../graphql/hook.endpoints.graphql.gen'

export const elementApi = getElementSdk(client)
export const hookApi = getHookSdk(client)
