import { IResourceType } from '@codelab/frontend/abstract/core'
import { ReactComponent as GraphQlSvg } from './graphql.svg'
import { ReactComponent as RestSvg } from './rest.svg'

export const icons = {
  [IResourceType.GraphQL]: GraphQlSvg,
  [IResourceType.Rest]: RestSvg,
}
