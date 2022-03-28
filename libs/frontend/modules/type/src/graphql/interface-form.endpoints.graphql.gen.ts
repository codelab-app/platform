import * as Types from '@codelab/shared/abstract/codegen'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-tag'
export type InterfaceForm_GetAppsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.AppOptions>
  where?: Types.InputMaybe<Types.AppWhere>
}>

export type InterfaceForm_GetAppsQuery = {
  apps: Array<{ id: string; name: string }>
}

export type InterfaceForm_GetAtomsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.AtomOptions>
  where?: Types.InputMaybe<Types.AtomWhere>
}>

export type InterfaceForm_GetAtomsQuery = {
  atoms: Array<{ id: string; name: string; type: Types.AtomType }>
}

export type InterfaceForm_GetAtomsWithApiQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.AtomOptions>
  where?: Types.InputMaybe<Types.AtomWhere>
}>

export type InterfaceForm_GetAtomsWithApiQuery = {
  atoms: Array<{
    id: string
    name: string
    type: Types.AtomType
    api: { id: string }
  }>
}

export type InterfaceForm_GetComponentsQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.ComponentOptions>
  where?: Types.InputMaybe<Types.ComponentWhere>
}>

export type InterfaceForm_GetComponentsQuery = {
  components: Array<{ id: string; name: string }>
}

export type InterfaceForm_GetPagesQueryVariables = Types.Exact<{
  options?: Types.InputMaybe<Types.PageOptions>
  where?: Types.InputMaybe<Types.PageWhere>
}>

export type InterfaceForm_GetPagesQuery = {
  pages: Array<{ id: string; name: string }>
}

export const InterfaceForm_GetAppsDocument = gql`
  query InterfaceForm_GetApps($options: AppOptions, $where: AppWhere) {
    apps(options: $options, where: $where) {
      id
      name
    }
  }
`
export const InterfaceForm_GetAtomsDocument = gql`
  query InterfaceForm_GetAtoms($options: AtomOptions, $where: AtomWhere) {
    atoms(options: $options, where: $where) {
      id
      name
      type
    }
  }
`
export const InterfaceForm_GetAtomsWithApiDocument = gql`
  query InterfaceForm_GetAtomsWithApi(
    $options: AtomOptions
    $where: AtomWhere
  ) {
    atoms(options: $options, where: $where) {
      id
      name
      type
      api {
        id
      }
    }
  }
`
export const InterfaceForm_GetComponentsDocument = gql`
  query InterfaceForm_GetComponents(
    $options: ComponentOptions
    $where: ComponentWhere
  ) {
    components(options: $options, where: $where) {
      id
      name
    }
  }
`
export const InterfaceForm_GetPagesDocument = gql`
  query InterfaceForm_GetPages($options: PageOptions, $where: PageWhere) {
    pages(options: $options, where: $where) {
      id
      name
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
    InterfaceForm_GetApps(
      variables?: InterfaceForm_GetAppsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<InterfaceForm_GetAppsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<InterfaceForm_GetAppsQuery>(
            InterfaceForm_GetAppsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'InterfaceForm_GetApps',
        'query',
      )
    },
    InterfaceForm_GetAtoms(
      variables?: InterfaceForm_GetAtomsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<InterfaceForm_GetAtomsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<InterfaceForm_GetAtomsQuery>(
            InterfaceForm_GetAtomsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'InterfaceForm_GetAtoms',
        'query',
      )
    },
    InterfaceForm_GetAtomsWithApi(
      variables?: InterfaceForm_GetAtomsWithApiQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<InterfaceForm_GetAtomsWithApiQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<InterfaceForm_GetAtomsWithApiQuery>(
            InterfaceForm_GetAtomsWithApiDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'InterfaceForm_GetAtomsWithApi',
        'query',
      )
    },
    InterfaceForm_GetComponents(
      variables?: InterfaceForm_GetComponentsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<InterfaceForm_GetComponentsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<InterfaceForm_GetComponentsQuery>(
            InterfaceForm_GetComponentsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'InterfaceForm_GetComponents',
        'query',
      )
    },
    InterfaceForm_GetPages(
      variables?: InterfaceForm_GetPagesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<InterfaceForm_GetPagesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<InterfaceForm_GetPagesQuery>(
            InterfaceForm_GetPagesDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'InterfaceForm_GetPages',
        'query',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
