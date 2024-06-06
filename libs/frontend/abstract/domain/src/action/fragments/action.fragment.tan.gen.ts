import * as Types from '@codelab/shared/abstract/codegen'

import {
  BaseAction_ApiAction_Fragment,
  BaseAction_CodeAction_Fragment,
} from './action-base.fragment.tan.gen'
import { CodeActionFragment } from './code-action.fragment.tan.gen'
import { ApiActionFragment } from './api-action.fragment.tan.gen'
import { BaseActionFragmentDoc } from './action-base.fragment.tan.gen'
import { CodeActionFragmentDoc } from './code-action.fragment.tan.gen'
import { ApiActionFragmentDoc } from './api-action.fragment.tan.gen'
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
