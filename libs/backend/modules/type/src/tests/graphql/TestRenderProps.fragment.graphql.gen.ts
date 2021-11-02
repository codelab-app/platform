import * as Types from '@codelab/shared/codegen/graphql'

import { gql } from '@apollo/client'
export type TestRenderPropsTypeFragment = { id: string; name: string }

export const TestRenderPropsTypeFragmentDoc = gql`
  fragment TestRenderPropsType on RenderPropsType {
    id
    name
  }
`
