import * as Types from '@codelab/shared/abstract/codegen'

export type EnumTypeValueFragment = { id: string; key: string; value: string }

export const EnumTypeValueFragmentDoc = `
    fragment EnumTypeValue on EnumTypeValue {
  id
  key
  value
}
    `
