import { client } from '@codelab/frontend/infra/graphql'
import { getSdk as getElementSdk } from './element.endpoints.graphql.gen'
import { getSdk as getHookSdk } from './hook.endpoints.graphql.gen'

export const elementApi = getElementSdk(client)

export const hookApi = getHookSdk(client)
