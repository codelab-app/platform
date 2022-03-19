import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk as getElementSdk } from '../graphql/element.endpoints.v2.1.graphql.gen'
import { getSdk as getHookSdk } from '../graphql/hook.endpoints.v2.1.graphql.gen'
import { getSdk as getPropMapBindingSdk } from '../graphql/prop-map-binding.endpoints.v2.1.graphql.gen'

export const elementApi = getElementSdk(client)
export const hookApi = getHookSdk(client)
export const propMapBindingApi = getPropMapBindingSdk(client)
