import * as Types from '@codelab/shared/abstract/codegen'

import { PropFragment } from '../prop/prop.fragment.tan.gen'
import { PropFragmentDoc } from '../prop/prop.fragment.tan.gen'
export type ResourceFragment = {
  id: string
  name: string
  type: Types.ResourceType
  config: PropFragment
}

export const ResourceFragmentDoc = `
    fragment Resource on Resource {
  config {
    ...Prop
  }
  id
  name
  type
}
    ${PropFragmentDoc}`
