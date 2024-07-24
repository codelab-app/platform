import * as Types from '@codelab/frontend/infra/gql'

import { graphql } from '@codelab/frontend/infra/gql'
import { gqlFetch } from '@codelab/frontend/infra/graphql'

export const DeletePrimitiveTypesDocument = graphql(`
  mutation DeletePrimitiveTypes(
    $delete: PrimitiveTypeDeleteInput
    $where: PrimitiveTypeWhere
  ) {
    deletePrimitiveTypes(delete: $delete, where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`)

export const DeleteArrayTypesDocument = graphql(`
  mutation DeleteArrayTypes(
    $delete: ArrayTypeDeleteInput
    $where: ArrayTypeWhere
  ) {
    deleteArrayTypes(delete: $delete, where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`)

export const DeleteReactNodeTypesDocument = graphql(`
  mutation DeleteReactNodeTypes(
    $delete: ReactNodeTypeDeleteInput
    $where: ReactNodeTypeWhere
  ) {
    deleteReactNodeTypes(delete: $delete, where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`)

export const DeleteUnionTypesDocument = graphql(`
  mutation DeleteUnionTypes(
    $delete: UnionTypeDeleteInput
    $where: UnionTypeWhere
  ) {
    deleteUnionTypes(delete: $delete, where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`)

export const DeleteInterfaceTypesDocument = graphql(`
  mutation DeleteInterfaceTypes(
    $delete: InterfaceTypeDeleteInput
    $where: InterfaceTypeWhere
  ) {
    deleteInterfaceTypes(delete: $delete, where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`)

export const DeleteElementTypesDocument = graphql(`
  mutation DeleteElementTypes(
    $delete: ElementTypeDeleteInput
    $where: ElementTypeWhere
  ) {
    deleteElementTypes(delete: $delete, where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`)

export const DeleteRenderPropTypesDocument = graphql(`
  mutation DeleteRenderPropTypes(
    $delete: RenderPropTypeDeleteInput
    $where: RenderPropTypeWhere
  ) {
    deleteRenderPropTypes(delete: $delete, where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`)

export const DeleteRichTextTypesDocument = graphql(`
  mutation DeleteRichTextTypes(
    $delete: RichTextTypeDeleteInput
    $where: RichTextTypeWhere
  ) {
    deleteRichTextTypes(delete: $delete, where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`)

export const DeleteEnumTypesDocument = graphql(`
  mutation DeleteEnumTypes(
    $delete: EnumTypeDeleteInput
    $where: EnumTypeWhere
  ) {
    deleteEnumTypes(delete: $delete, where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
    deleteEnumTypeValues(where: { enumTypeConnection: { node: $where } }) {
      nodesDeleted
    }
  }
`)

export const DeleteLambdaTypesDocument = graphql(`
  mutation DeleteLambdaTypes(
    $delete: LambdaTypeDeleteInput
    $where: LambdaTypeWhere
  ) {
    deleteLambdaTypes(delete: $delete, where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`)

export const DeletePageTypesDocument = graphql(`
  mutation DeletePageTypes(
    $delete: PageTypeDeleteInput
    $where: PageTypeWhere
  ) {
    deletePageTypes(delete: $delete, where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`)

export const DeleteAppTypesDocument = graphql(`
  mutation DeleteAppTypes($delete: AppTypeDeleteInput, $where: AppTypeWhere) {
    deleteAppTypes(delete: $delete, where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`)

export const DeleteActionTypesDocument = graphql(`
  mutation DeleteActionTypes(
    $delete: ActionTypeDeleteInput
    $where: ActionTypeWhere
  ) {
    deleteActionTypes(delete: $delete, where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`)

export const DeleteCodeMirrorTypesDocument = graphql(`
  mutation DeleteCodeMirrorTypes(
    $delete: CodeMirrorTypeDeleteInput
    $where: CodeMirrorTypeWhere
  ) {
    deleteCodeMirrorTypes(delete: $delete, where: $where) {
      nodesDeleted
      relationshipsDeleted
    }
  }
`)
import {
  type DeletePrimitiveTypesMutationVariables,
  type DeleteArrayTypesMutationVariables,
  type DeleteReactNodeTypesMutationVariables,
  type DeleteUnionTypesMutationVariables,
  type DeleteInterfaceTypesMutationVariables,
  type DeleteElementTypesMutationVariables,
  type DeleteRenderPropTypesMutationVariables,
  type DeleteRichTextTypesMutationVariables,
  type DeleteEnumTypesMutationVariables,
  type DeleteLambdaTypesMutationVariables,
  type DeletePageTypesMutationVariables,
  type DeleteAppTypesMutationVariables,
  type DeleteActionTypesMutationVariables,
  type DeleteCodeMirrorTypesMutationVariables,
} from '@codelab/frontend/infra/gql'

const DeletePrimitiveTypes = (
  variables: DeletePrimitiveTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeletePrimitiveTypesDocument, variables, next)

const DeleteArrayTypes = (
  variables: DeleteArrayTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteArrayTypesDocument, variables, next)

const DeleteReactNodeTypes = (
  variables: DeleteReactNodeTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteReactNodeTypesDocument, variables, next)

const DeleteUnionTypes = (
  variables: DeleteUnionTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteUnionTypesDocument, variables, next)

const DeleteInterfaceTypes = (
  variables: DeleteInterfaceTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteInterfaceTypesDocument, variables, next)

const DeleteElementTypes = (
  variables: DeleteElementTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteElementTypesDocument, variables, next)

const DeleteRenderPropTypes = (
  variables: DeleteRenderPropTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteRenderPropTypesDocument, variables, next)

const DeleteRichTextTypes = (
  variables: DeleteRichTextTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteRichTextTypesDocument, variables, next)

const DeleteEnumTypes = (
  variables: DeleteEnumTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteEnumTypesDocument, variables, next)

const DeleteLambdaTypes = (
  variables: DeleteLambdaTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteLambdaTypesDocument, variables, next)

const DeletePageTypes = (
  variables: DeletePageTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeletePageTypesDocument, variables, next)

const DeleteAppTypes = (
  variables: DeleteAppTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteAppTypesDocument, variables, next)

const DeleteActionTypes = (
  variables: DeleteActionTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteActionTypesDocument, variables, next)

const DeleteCodeMirrorTypes = (
  variables: DeleteCodeMirrorTypesMutationVariables,
  next?: NextFetchRequestConfig,
) => gqlFetch(DeleteCodeMirrorTypesDocument, variables, next)

export const getSdk = () => ({
  DeletePrimitiveTypes,
  DeleteArrayTypes,
  DeleteReactNodeTypes,
  DeleteUnionTypes,
  DeleteInterfaceTypes,
  DeleteElementTypes,
  DeleteRenderPropTypes,
  DeleteRichTextTypes,
  DeleteEnumTypes,
  DeleteLambdaTypes,
  DeletePageTypes,
  DeleteAppTypes,
  DeleteActionTypes,
  DeleteCodeMirrorTypes,
})
