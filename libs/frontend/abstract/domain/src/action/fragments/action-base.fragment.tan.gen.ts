import * as Types from '@codelab/shared/abstract/codegen'

export type BaseAction_ApiAction_Fragment = {
  __typename: 'ApiAction'
  id: string
  name: string
  type: Types.ActionKind
  store: { id: string; name: string }
}

export type BaseAction_CodeAction_Fragment = {
  __typename: 'CodeAction'
  id: string
  name: string
  type: Types.ActionKind
  store: { id: string; name: string }
}

export type BaseActionFragment =
  | BaseAction_ApiAction_Fragment
  | BaseAction_CodeAction_Fragment

export const BaseActionFragmentDoc = `
    fragment BaseAction on BaseAction {
  __typename
  id
  name
  store {
    id
    name
  }
  type
}
    `
