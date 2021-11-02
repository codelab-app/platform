import * as Types from '@codelab/frontend/abstract/codegen'

import { TestEnumTypeValueFragment } from './TestEnumTypeValue.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { TestEnumTypeValueFragmentDoc } from './TestEnumTypeValue.fragment.graphql.gen'
export type TestEnumTypeFragment = {
  id: string
  name: string
  allowedValues: Array<TestEnumTypeValueFragment>
}

export const TestEnumTypeFragmentDoc = gql`
  fragment TestEnumType on EnumType {
    id
    name
    allowedValues {
      ...TestEnumTypeValue
    }
  }
  ${TestEnumTypeValueFragmentDoc}
`
