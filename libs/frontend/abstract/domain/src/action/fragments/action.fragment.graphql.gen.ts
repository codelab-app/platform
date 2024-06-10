import * as Types from '@codelab/shared/abstract/codegen'

import { fetchParams } from '@codelab/shared/config'
import {
  BaseAction_ApiAction_Fragment,
  BaseAction_CodeAction_Fragment,
} from './action-base.fragment.graphql.gen'
import { CodeActionFragment } from './code-action.fragment.graphql.gen'
import { ApiActionFragment } from './api-action.fragment.graphql.gen'
import { BaseActionFragmentDoc } from './action-base.fragment.graphql.gen'
import { CodeActionFragmentDoc } from './code-action.fragment.graphql.gen'
import { ApiActionFragmentDoc } from './api-action.fragment.graphql.gen'
export type Action_ApiAction_Fragment = ApiActionFragment &
  BaseAction_ApiAction_Fragment

export type Action_CodeAction_Fragment = CodeActionFragment &
  BaseAction_CodeAction_Fragment

export type ActionFragment =
  | Action_ApiAction_Fragment
  | Action_CodeAction_Fragment

export const ActionFragmentDoc = `
    fragment Action on BaseAction {
  ...BaseAction
  ... on CodeAction {
    ...CodeAction
  }
  ... on ApiAction {
    ...ApiAction
  }
}
    ${BaseActionFragmentDoc}
${CodeActionFragmentDoc}
${ApiActionFragmentDoc}`
