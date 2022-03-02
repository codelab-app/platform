import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type E2eCreateAtomMutationVariables = Types.Exact<{
  input: Types.AtomCreateInput
}>

export type E2eCreateAtomMutation = {
  __typename?: 'Mutation'
  createAtoms: {
    __typename?: 'CreateAtomsMutationResponse'
    atoms: Array<{
      __typename: 'Atom'
      id: string
      name: string
      type: Types.AtomType
      tags?:
        | Array<{ __typename?: 'Tag'; id: string; name: string }>
        | null
        | undefined
      api: { __typename?: 'InterfaceType'; id: string; name: string }
    }>
  }
}

export type E2eGetAtomsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.AtomWhere>
  options?: Types.InputMaybe<Types.AtomOptions>
}>

export type E2eGetAtomsQuery = {
  __typename?: 'Query'
  atoms: Array<{
    __typename: 'Atom'
    id: string
    name: string
    type: Types.AtomType
    tags?:
      | Array<{ __typename?: 'Tag'; id: string; name: string }>
      | null
      | undefined
    api: { __typename?: 'InterfaceType'; id: string; name: string }
  }>
}

export type E2eAtomFragment = {
  __typename: 'Atom'
  id: string
  name: string
  type: Types.AtomType
  tags?:
    | Array<{ __typename?: 'Tag'; id: string; name: string }>
    | null
    | undefined
  api: { __typename?: 'InterfaceType'; id: string; name: string }
}

export const E2eAtomFragmentDoc = gql`
  fragment E2eAtom on Atom {
    __typename
    id
    name
    type
    tags {
      id
      name
    }
    api {
      id
      name
    }
  }
`
export const E2eCreateAtomDocument = gql`
  mutation E2eCreateAtom($input: AtomCreateInput!) {
    createAtoms(input: $input) {
      atoms {
        ...E2eAtom
      }
    }
  }
  ${E2eAtomFragmentDoc}
`
export const E2eGetAtomsDocument = gql`
  query E2eGetAtoms($where: AtomWhere, $options: AtomOptions) {
    atoms(where: $where, options: $options) {
      ...E2eAtom
    }
  }
  ${E2eAtomFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    E2eCreateAtom(
      variables: E2eCreateAtomMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreateAtomMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreateAtomMutation>(
            E2eCreateAtomDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'E2eCreateAtom',
      )
    },
    E2eGetAtoms(
      variables?: E2eGetAtomsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eGetAtomsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eGetAtomsQuery>(E2eGetAtomsDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'E2eGetAtoms',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
