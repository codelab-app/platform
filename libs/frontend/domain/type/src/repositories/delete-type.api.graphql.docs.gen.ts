import * as Types from '@codelab/shared/infra/gql'

import { graphql } from '@codelab/shared/infra/gql'

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
