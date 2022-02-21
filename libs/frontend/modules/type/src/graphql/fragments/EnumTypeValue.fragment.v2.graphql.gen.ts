import * as Types from '@codelab/shared/abstract/codegen-v2'

import { gql } from '@apollo/client'
export type EnumTypeValueFragment = {
  id: string
  name?: string | null | undefined
  value: string
}

export const EnumTypeValueFragmentDoc = gql`
  fragment EnumTypeValue on EnumTypeValue {
    id
    name
    value
  }
`
