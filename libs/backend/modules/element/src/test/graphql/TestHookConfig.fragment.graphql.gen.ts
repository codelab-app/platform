import * as Types from '@codelab/shared/abstract/codegen'

import { gql } from '@apollo/client'
export type TestHookConfigFragment = { __typename: 'Prop'; data: string }

export const TestHookConfigFragmentDoc = gql`
  fragment TestHookConfig on Prop {
    data
    __typename
  }
`
