import * as Types from '@codelab/frontend/abstract/codegen'

import { gql } from '@apollo/client'
export type TestEnumTypeValueFragment = {
  id: string
  name?: string | null | undefined
  value: string
}

export const TestEnumTypeValueFragmentDoc = gql`
  fragment TestEnumTypeValue on EnumTypeValue {
    id
    name
    value
  }
`
