import * as Types from '@codelab/shared/codegen/graphql'

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
