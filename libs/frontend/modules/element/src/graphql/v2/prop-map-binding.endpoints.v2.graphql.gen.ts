import * as Types from '@codelab/shared/abstract/codegen-v2'

import { PropMapBindingFragment } from './Element.fragment.v2.graphql.gen'
export type CreatePropMapBindingsMutationVariables = Types.Exact<{
  input:
    | Array<Types.PropMapBindingCreateInput>
    | Types.PropMapBindingCreateInput
}>

export type CreatePropMapBindingsMutation = {
  createPropMapBindings: { propMapBindings: Array<PropMapBindingFragment> }
}

export type UpdatePropMapBindingsMutationVariables = Types.Exact<{
  where: Types.PropMapBindingWhere
  update: Types.PropMapBindingUpdateInput
}>

export type UpdatePropMapBindingsMutation = {
  updatePropMapBindings: { propMapBindings: Array<PropMapBindingFragment> }
}

export type DeletePropMapBindingsMutationVariables = Types.Exact<{
  where: Types.PropMapBindingWhere
}>

export type DeletePropMapBindingsMutation = {
  deletePropMapBindings: { nodesDeleted: number }
}

export type GetPropMapBindingsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.PropMapBindingOptions>
  where?: Types.InputMaybe<Types.PropMapBindingWhere>
}>

export type GetPropMapBindingsQuery = {
  propMapBindings: Array<PropMapBindingFragment>
}
