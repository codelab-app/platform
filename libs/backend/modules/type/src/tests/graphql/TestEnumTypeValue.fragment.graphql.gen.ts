import * as Types from '@codelab/shared/codegen/graphql'

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
