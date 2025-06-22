import { IResourceType } from '@codelab/shared-abstract-core'

import GraphQlPlusSvg from './add-graphql.svg'
import RestPlusSvg from './add-rest.svg'
import GraphQlSvg from './graphql.svg'
import RestSvg from './rest.svg'

export const icons = {
  add: {
    [IResourceType.GraphQl]: GraphQlPlusSvg,
    [IResourceType.Rest]: RestPlusSvg,
  },
  [IResourceType.GraphQl]: GraphQlSvg,
  [IResourceType.Rest]: RestSvg,
}
