import * as Types from '@codelab/shared/abstract/codegen'

import { fetchParams } from '@codelab/shared/config'
import {
  BaseAction_ApiAction_Fragment,
  BaseAction_CodeAction_Fragment,
} from './action-base.fragment.graphql.gen'
import { BaseActionFragmentDoc } from './action-base.fragment.graphql.gen'
export type CodeActionFragment = {
  code: string
} & BaseAction_CodeAction_Fragment

export const CodeActionFragmentDoc = `
    fragment CodeAction on CodeAction {
  ...BaseAction
  code
}
    ${BaseActionFragmentDoc}`
