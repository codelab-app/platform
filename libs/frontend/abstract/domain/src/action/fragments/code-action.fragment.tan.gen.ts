import * as Types from '@codelab/shared/abstract/codegen'

import {
  BaseAction_ApiAction_Fragment,
  BaseAction_CodeAction_Fragment,
} from './action-base.fragment.tan.gen'
import { BaseActionFragmentDoc } from './action-base.fragment.tan.gen'
export type CodeActionFragment = {
  code: string
} & BaseAction_CodeAction_Fragment

export const CodeActionFragmentDoc = `
    fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
    ${BaseActionFragmentDoc}`
