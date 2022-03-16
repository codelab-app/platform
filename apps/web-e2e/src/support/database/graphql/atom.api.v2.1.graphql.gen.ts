import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-request'
export type E2eCreateAtomMutationVariables = Types.Exact<{
  input: Array<Types.AtomCreateInput> | Types.AtomCreateInput
}>

export type E2eCreateAtomMutation = {
  createAtoms: { atoms: Array<E2eAtomFragment> }
}

export type E2eImportAtomsMutationVariables = Types.Exact<{
  input: Types.ImportAtomsInput
}>

export type E2eImportAtomsMutation = {
  importAtoms?: { atoms: Array<{ id: string }> } | null
}

export type E2eAtomFragment = {
  __typename: 'Atom'
  id: string
  name: string
  type: Types.AtomType
  tags: Array<{ id: string; name: string }>
  api: { id: string; name: string }
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
export const E2eCreateAtomGql = gql`
  mutation E2eCreateAtom($input: [AtomCreateInput!]!) {
    createAtoms(input: $input) {
      atoms {
        ...E2eAtom
      }
    }
  }
  ${E2eAtomFragmentDoc}
`
export const E2eImportAtomsGql = gql`
  mutation E2eImportAtoms($input: ImportAtomsInput!) {
    importAtoms(input: $input) {
      atoms {
        id
      }
    }
  }
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
    E2eCreateAtom(
      variables: E2eCreateAtomMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eCreateAtomMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eCreateAtomMutation>(E2eCreateAtomGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'E2eCreateAtom',
        'mutation',
      )
    },
    E2eImportAtoms(
      variables: E2eImportAtomsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<E2eImportAtomsMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<E2eImportAtomsMutation>(E2eImportAtomsGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'E2eImportAtoms',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
