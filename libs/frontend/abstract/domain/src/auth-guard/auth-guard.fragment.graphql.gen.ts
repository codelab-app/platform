import * as Types from '@codelab/shared/abstract/codegen'

import { fetchParams } from '@codelab/shared/config'
import { PropFragment } from '../prop/prop.fragment.graphql.gen'
import { ResourceFragment } from '../resource/resource.fragment.graphql.gen'
import { PropFragmentDoc } from '../prop/prop.fragment.graphql.gen'
import { ResourceFragmentDoc } from '../resource/resource.fragment.graphql.gen'
export type AuthGuardFragment = {
  id: string
  name: string
  responseTransformer: string
  config: PropFragment
  resource: ResourceFragment
}

export const AuthGuardFragmentDoc = `
    fragment AuthGuard on AuthGuard {
  config {
    ...Prop
  }
  id
  name
  resource {
    ...Resource
  }
  responseTransformer
}
    ${PropFragmentDoc}
${ResourceFragmentDoc}`
