import * as Types from '@codelab/shared/abstract/codegen'

import { fetchParams } from '@codelab/shared/config'
import {
  Action_ApiAction_Fragment,
  Action_CodeAction_Fragment,
} from '../action/fragments/action.fragment.graphql.gen'
import { InterfaceTypeFragment } from '../type/fragments/interface.fragment.graphql.gen'
import { ActionFragmentDoc } from '../action/fragments/action.fragment.graphql.gen'
import { InterfaceTypeFragmentDoc } from '../type/fragments/interface.fragment.graphql.gen'
export type StoreFragment = {
  id: string
  name: string
  actions: Array<Action_ApiAction_Fragment | Action_CodeAction_Fragment>
  api: InterfaceTypeFragment
}

export type ProductionStoreFragment = {
  id: string
  name: string
  actions: Array<Action_ApiAction_Fragment | Action_CodeAction_Fragment>
}

export const StoreFragmentDoc = `
    fragment Store on Store {
  actions {
    ...Action
  }
  api {
    ...InterfaceType
  }
  id
  name
}
    ${ActionFragmentDoc}
${InterfaceTypeFragmentDoc}`
export const ProductionStoreFragmentDoc = `
    fragment ProductionStore on Store {
  actions {
    ...Action
  }
  id
  name
}
    ${ActionFragmentDoc}`
