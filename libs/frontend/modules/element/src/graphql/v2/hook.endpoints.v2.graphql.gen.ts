import * as Types from '@codelab/shared/abstract/codegen-v2'

import { HookFragment } from './Element.fragment.v2.graphql.gen'
export type CreateHooksMutationVariables = Types.Exact<{
  input: Array<Types.HookCreateInput> | Types.HookCreateInput
}>

export type CreateHooksMutation = {
  createHooks: { hooks: Array<HookFragment> }
}

export type DeleteHooksMutationVariables = Types.Exact<{
  where: Types.HookWhere
}>

export type DeleteHooksMutation = { deleteHooks: { nodesDeleted: number } }
