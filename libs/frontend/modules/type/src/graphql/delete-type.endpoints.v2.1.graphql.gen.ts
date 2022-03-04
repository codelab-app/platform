import * as Types from '@codelab/shared/abstract/codegen-v2'

import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { gql } from 'graphql-request'
export type DeletePrimitiveTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.PrimitiveTypeDeleteInput>
  where?: Types.InputMaybe<Types.PrimitiveTypeWhere>
}>

export type DeletePrimitiveTypesMutation = {
  deletePrimitiveTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export type DeleteArrayTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.ArrayTypeDeleteInput>
  where?: Types.InputMaybe<Types.ArrayTypeWhere>
}>

export type DeleteArrayTypesMutation = {
  deleteArrayTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export type DeleteReactNodeTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.ReactNodeTypeDeleteInput>
  where?: Types.InputMaybe<Types.ReactNodeTypeWhere>
}>

export type DeleteReactNodeTypesMutation = {
  deleteReactNodeTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export type DeleteUnionTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.UnionTypeDeleteInput>
  where?: Types.InputMaybe<Types.UnionTypeWhere>
}>

export type DeleteUnionTypesMutation = {
  deleteUnionTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export type DeleteInterfaceTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.InterfaceTypeDeleteInput>
  where?: Types.InputMaybe<Types.InterfaceTypeWhere>
}>

export type DeleteInterfaceTypesMutation = {
  deleteInterfaceTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export type DeleteElementTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.ElementTypeDeleteInput>
  where?: Types.InputMaybe<Types.ElementTypeWhere>
}>

export type DeleteElementTypesMutation = {
  deleteElementTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export type DeleteRenderPropsTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.RenderPropsTypeDeleteInput>
  where?: Types.InputMaybe<Types.RenderPropsTypeWhere>
}>

export type DeleteRenderPropsTypesMutation = {
  deleteRenderPropsTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export type DeleteEnumTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.EnumTypeDeleteInput>
  where?: Types.InputMaybe<Types.EnumTypeWhere>
}>

export type DeleteEnumTypesMutation = {
  deleteEnumTypes: { relationshipsDeleted: number; nodesDeleted: number }
  deleteEnumTypeValues: { nodesDeleted: number }
}

export type DeleteLambdaTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.LambdaTypeDeleteInput>
  where?: Types.InputMaybe<Types.LambdaTypeWhere>
}>

export type DeleteLambdaTypesMutation = {
  deleteLambdaTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export type DeletePageTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.PageTypeDeleteInput>
  where?: Types.InputMaybe<Types.PageTypeWhere>
}>

export type DeletePageTypesMutation = {
  deletePageTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export type DeleteAppTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.AppTypeDeleteInput>
  where?: Types.InputMaybe<Types.AppTypeWhere>
}>

export type DeleteAppTypesMutation = {
  deleteAppTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export type DeleteMonacoTypesMutationVariables = Types.Exact<{
  delete?: Types.InputMaybe<Types.MonacoTypeDeleteInput>
  where?: Types.InputMaybe<Types.MonacoTypeWhere>
}>

export type DeleteMonacoTypesMutation = {
  deleteMonacoTypes: { relationshipsDeleted: number; nodesDeleted: number }
}

export const DeletePrimitiveTypesGql = gql`
  mutation DeletePrimitiveTypes(
    $delete: PrimitiveTypeDeleteInput
    $where: PrimitiveTypeWhere
  ) {
    deletePrimitiveTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
export const DeleteArrayTypesGql = gql`
  mutation DeleteArrayTypes(
    $delete: ArrayTypeDeleteInput
    $where: ArrayTypeWhere
  ) {
    deleteArrayTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
export const DeleteReactNodeTypesGql = gql`
  mutation DeleteReactNodeTypes(
    $delete: ReactNodeTypeDeleteInput
    $where: ReactNodeTypeWhere
  ) {
    deleteReactNodeTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
export const DeleteUnionTypesGql = gql`
  mutation DeleteUnionTypes(
    $delete: UnionTypeDeleteInput
    $where: UnionTypeWhere
  ) {
    deleteUnionTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
export const DeleteInterfaceTypesGql = gql`
  mutation DeleteInterfaceTypes(
    $delete: InterfaceTypeDeleteInput
    $where: InterfaceTypeWhere
  ) {
    deleteInterfaceTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
export const DeleteElementTypesGql = gql`
  mutation DeleteElementTypes(
    $delete: ElementTypeDeleteInput
    $where: ElementTypeWhere
  ) {
    deleteElementTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
export const DeleteRenderPropsTypesGql = gql`
  mutation DeleteRenderPropsTypes(
    $delete: RenderPropsTypeDeleteInput
    $where: RenderPropsTypeWhere
  ) {
    deleteRenderPropsTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
export const DeleteEnumTypesGql = gql`
  mutation DeleteEnumTypes(
    $delete: EnumTypeDeleteInput
    $where: EnumTypeWhere
  ) {
    deleteEnumTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
    deleteEnumTypeValues(where: { enumType: $where }) {
      nodesDeleted
    }
  }
`
export const DeleteLambdaTypesGql = gql`
  mutation DeleteLambdaTypes(
    $delete: LambdaTypeDeleteInput
    $where: LambdaTypeWhere
  ) {
    deleteLambdaTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
export const DeletePageTypesGql = gql`
  mutation DeletePageTypes(
    $delete: PageTypeDeleteInput
    $where: PageTypeWhere
  ) {
    deletePageTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
export const DeleteAppTypesGql = gql`
  mutation DeleteAppTypes($delete: AppTypeDeleteInput, $where: AppTypeWhere) {
    deleteAppTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
    }
  }
`
export const DeleteMonacoTypesGql = gql`
  mutation DeleteMonacoTypes(
    $delete: MonacoTypeDeleteInput
    $where: MonacoTypeWhere
  ) {
    deleteMonacoTypes(delete: $delete, where: $where) {
      relationshipsDeleted
      nodesDeleted
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
    DeletePrimitiveTypes(
      variables?: DeletePrimitiveTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeletePrimitiveTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeletePrimitiveTypesMutation>(
            DeletePrimitiveTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeletePrimitiveTypes',
        'mutation',
      )
    },
    DeleteArrayTypes(
      variables?: DeleteArrayTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteArrayTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteArrayTypesMutation>(
            DeleteArrayTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteArrayTypes',
        'mutation',
      )
    },
    DeleteReactNodeTypes(
      variables?: DeleteReactNodeTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteReactNodeTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteReactNodeTypesMutation>(
            DeleteReactNodeTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteReactNodeTypes',
        'mutation',
      )
    },
    DeleteUnionTypes(
      variables?: DeleteUnionTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteUnionTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteUnionTypesMutation>(
            DeleteUnionTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteUnionTypes',
        'mutation',
      )
    },
    DeleteInterfaceTypes(
      variables?: DeleteInterfaceTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteInterfaceTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteInterfaceTypesMutation>(
            DeleteInterfaceTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteInterfaceTypes',
        'mutation',
      )
    },
    DeleteElementTypes(
      variables?: DeleteElementTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteElementTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteElementTypesMutation>(
            DeleteElementTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteElementTypes',
        'mutation',
      )
    },
    DeleteRenderPropsTypes(
      variables?: DeleteRenderPropsTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteRenderPropsTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteRenderPropsTypesMutation>(
            DeleteRenderPropsTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteRenderPropsTypes',
        'mutation',
      )
    },
    DeleteEnumTypes(
      variables?: DeleteEnumTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteEnumTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteEnumTypesMutation>(
            DeleteEnumTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteEnumTypes',
        'mutation',
      )
    },
    DeleteLambdaTypes(
      variables?: DeleteLambdaTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteLambdaTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteLambdaTypesMutation>(
            DeleteLambdaTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteLambdaTypes',
        'mutation',
      )
    },
    DeletePageTypes(
      variables?: DeletePageTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeletePageTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeletePageTypesMutation>(
            DeletePageTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeletePageTypes',
        'mutation',
      )
    },
    DeleteAppTypes(
      variables?: DeleteAppTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteAppTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteAppTypesMutation>(DeleteAppTypesGql, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'DeleteAppTypes',
        'mutation',
      )
    },
    DeleteMonacoTypes(
      variables?: DeleteMonacoTypesMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<DeleteMonacoTypesMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteMonacoTypesMutation>(
            DeleteMonacoTypesGql,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        'DeleteMonacoTypes',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
