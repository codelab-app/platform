import * as Types from '@codelab/shared/abstract/codegen'

import { fetchParams } from '@codelab/shared/config'
import { PropFragment } from '../prop/prop.fragment.graphql.gen'
import { PropFragmentDoc } from '../prop/prop.fragment.graphql.gen'
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
