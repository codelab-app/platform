import * as Types from '@codelab/shared/abstract/codegen'

import { fetchParams } from '@codelab/shared/config'
import {
  BaseAction_ApiAction_Fragment,
  BaseAction_CodeAction_Fragment,
} from './action-base.fragment.graphql.gen'
import { ResourceFragment } from '../../resource/resource.fragment.graphql.gen'
import { BaseActionFragmentDoc } from './action-base.fragment.graphql.gen'
import { ResourceFragmentDoc } from '../../resource/resource.fragment.graphql.gen'
export type ApiActionFragment = {
  config: { data: string; id: string }
  errorAction?:
    | BaseAction_ApiAction_Fragment
    | BaseAction_CodeAction_Fragment
    | null
  resource: ResourceFragment
  successAction?:
    | BaseAction_ApiAction_Fragment
    | BaseAction_CodeAction_Fragment
    | null
} & BaseAction_ApiAction_Fragment

export const ApiActionFragmentDoc = `
    fragment ApiAction on ApiAction {
  ...BaseAction
  config {
    data
    id
  }
  errorAction {
    ...BaseAction
  }
  resource {
    ...Resource
  }
  successAction {
    ...BaseAction
  }
}
    ${BaseActionFragmentDoc}
${ResourceFragmentDoc}`
