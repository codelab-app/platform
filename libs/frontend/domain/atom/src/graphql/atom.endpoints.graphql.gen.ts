import * as Types from '@codelab/shared/abstract/codegen'

import { AtomFragment } from '../../../../abstract/core/src/domain/atom/atom.fragment.graphql.gen'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
import { AtomFragmentDoc } from '../../../../abstract/core/src/domain/atom/atom.fragment.graphql.gen'
export type CreateAtomsMutationVariables = Types.Exact<{
  input: Array<Types.AtomCreateInput> | Types.AtomCreateInput
}>

export type CreateAtomsMutation = {
  createAtoms: {
    info: { nodesCreated: number; relationshipsCreated: number }
    atoms: Array<AtomFragment>
  }
}

export type DeleteAtomsMutationVariables = Types.Exact<{
  where: Types.AtomWhere
}>

export type DeleteAtomsMutation = {
  deleteAtoms: { nodesDeleted: number; relationshipsDeleted: number }
}

export type GetAtomsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.AtomWhere>
  options?: Types.InputMaybe<Types.AtomOptions>
}>

export type GetAtomsQuery = {
  atomsAggregate: { count: number }
  atoms: Array<AtomFragment>
}

export type UpdateAtomsMutationVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.AtomWhere>
  update?: Types.InputMaybe<Types.AtomUpdateInput>
}>

export type UpdateAtomsMutation = {
  updateAtoms: { atoms: Array<AtomFragment> }
}

export const CreateAtomsDocument = gql`
  mutation CreateAtoms($input: [AtomCreateInput!]!) {
    createAtoms(input: $input) {
      info {
        nodesCreated
        relationshipsCreated
      }
      atoms {
        ...Atom
      }
    }
  }
  ${AtomFragmentDoc}
`
export const DeleteAtomsDocument = gql`
  mutation DeleteAtoms($where: AtomWhere!) {
    deleteAtoms(where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`
export const GetAtomsDocument = gql`
  query GetAtoms($where: AtomWhere, $options: AtomOptions) {
    atomsAggregate(where: $where) {
      count
    }
    atoms(where: $where, options: $options) {
      ...Atom
    }
  }
  ${AtomFragmentDoc}
`
export const UpdateAtomsDocument = gql`
  mutation UpdateAtoms($where: AtomWhere, $update: AtomUpdateInput) {
    updateAtoms(update: $update, where: $where) {
      atoms {
        ...Atom
      }
    }
  }
  ${AtomFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    CreateAtoms(
      variables: CreateAtomsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<CreateAtomsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateAtomsMutation>(CreateAtomsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'CreateAtoms',
        'mutation',
      )
    },
    DeleteAtoms(
      variables: DeleteAtomsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteAtomsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteAtomsMutation>(DeleteAtomsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteAtoms',
        'mutation',
      )
    },
    GetAtoms(
      variables?: GetAtomsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<GetAtomsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetAtomsQuery>(GetAtomsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'GetAtoms',
        'query',
      )
    },
    UpdateAtoms(
      variables?: UpdateAtomsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<UpdateAtomsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateAtomsMutation>(UpdateAtomsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'UpdateAtoms',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
