import { client } from '@codelab/frontend/model/infra/graphql'
import { getSdk as getElementSdk } from '../graphql/element.endpoints.graphql.gen'
import { getSdk as getHookSdk } from '../graphql/hook.endpoints.graphql.gen'
import { getSdk as getPropMapBindingSdk } from '../graphql/prop-map-binding.endpoints.graphql.gen'

export const elementApi = getElementSdk(client)
export const hookApi = getHookSdk(client)
export const propMapBindingApi = getPropMapBindingSdk(client)
