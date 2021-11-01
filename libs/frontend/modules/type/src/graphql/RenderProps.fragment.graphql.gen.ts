import * as Types from '@codelab/shared/codegen/graphql'

export type RenderPropsTypeFragment = { id: string; name: string }

export const RenderPropsTypeFragmentDoc = gql`
  fragment RenderPropsType on RenderPropsType {
    id
    name
  }
`
