import * as Types from '@codelab/shared/abstract/codegen'

import { ElementFragment } from './Element.fragment.graphql.gen'
import { gql } from '@apollo/client'
import { ElementFragmentDoc } from './Element.fragment.graphql.gen'
import {
  api,
  GraphqlOperationOptions,
} from '@codelab/frontend/model/infra/redux'
export type UpdateElementPropsMutationVariables = Types.Exact<{
  input: Types.UpdateElementPropsInput
}>

export type UpdateElementPropsMutation = { updateElementProps: ElementFragment }

export type ConvertElementToComponentMutationVariables = Types.Exact<{
  input: Types.ConvertElementToComponentInput
}>

export type ConvertElementToComponentMutation = {
  convertElementToComponent: ElementFragment
}

export const UpdateElementPropsGql = gql`
  mutation UpdateElementProps($input: UpdateElementPropsInput!) {
    updateElementProps(input: $input) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`
export const ConvertElementToComponentGql = gql`
  mutation ConvertElementToComponent($input: ConvertElementToComponentInput!) {
    convertElementToComponent(input: $input) {
      ...Element
    }
  }
  ${ElementFragmentDoc}
`

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    UpdateElementProps: build.mutation<
      UpdateElementPropsMutation,
      GraphqlOperationOptions<UpdateElementPropsMutationVariables>
    >({
      query: (options) => ({
        document: UpdateElementPropsGql,
        options: options ?? undefined,
      }),
    }),
    ConvertElementToComponent: build.mutation<
      ConvertElementToComponentMutation,
      GraphqlOperationOptions<ConvertElementToComponentMutationVariables>
    >({
      query: (options) => ({
        document: ConvertElementToComponentGql,
        options: options ?? undefined,
      }),
    }),
  }),
})
export { injectedRtkApi as api }
export const {
  useUpdateElementPropsMutation,
  useConvertElementToComponentMutation,
} = injectedRtkApi
