import * as Types from '@codelab/shared/abstract/codegen'

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
