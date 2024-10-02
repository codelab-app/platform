import { IResourceType } from '@codelab/shared/abstract/core'

import { ReactComponent as GraphQlPlusSvg } from './add-graphql.svg'
import { ReactComponent as RestPlusSvg } from './add-rest.svg'
import { ReactComponent as GraphQlSvg } from './graphql.svg'
import { ReactComponent as RestSvg } from './rest.svg'

export const icons = {
  add: {
    [IResourceType.GraphQl]: GraphQlPlusSvg,
    [IResourceType.Rest]: RestPlusSvg,
  },
  [IResourceType.GraphQl]: GraphQlSvg,
  [IResourceType.Rest]: RestSvg,
}
