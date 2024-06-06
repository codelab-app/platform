import * as Types from '@codelab/shared/abstract/codegen'

import { PropFragment } from '../prop/prop.fragment.tan.gen'
import { ResourceFragment } from '../resource/resource.fragment.tan.gen'
import { PropFragmentDoc } from '../prop/prop.fragment.tan.gen'
import { ResourceFragmentDoc } from '../resource/resource.fragment.tan.gen'
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
