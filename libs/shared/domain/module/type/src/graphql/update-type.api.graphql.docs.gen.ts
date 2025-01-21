import * as Types from '@codelab/shared/infra/gqlgen'

import { graphql } from '@codelab/shared/infra/gqlgen'

export const UpdatePrimitiveTypesDocument = graphql(`
  mutation UpdatePrimitiveTypes(
    $update: PrimitiveTypeUpdateInput
    $where: PrimitiveTypeWhere
  ) {
    types: updatePrimitiveTypes(update: $update, where: $where) {
      types: primitiveTypes {
        __typename
        id
      }
    }
  }
`)

export const UpdateArrayTypesDocument = graphql(`
  mutation UpdateArrayTypes(
    $update: ArrayTypeUpdateInput
    $where: ArrayTypeWhere
  ) {
    types: updateArrayTypes(update: $update, where: $where) {
      types: arrayTypes {
        __typename
        id
      }
    }
  }
`)

export const UpdateUnionTypesDocument = graphql(`
  mutation UpdateUnionTypes(
    $update: UnionTypeUpdateInput
    $where: UnionTypeWhere
  ) {
    types: updateUnionTypes(update: $update, where: $where) {
      types: unionTypes {
        __typename
        id
      }
    }
  }
`)

export const UpdateInterfaceTypesDocument = graphql(`
  mutation UpdateInterfaceTypes(
    $update: InterfaceTypeUpdateInput
    $where: InterfaceTypeWhere
  ) {
    types: updateInterfaceTypes(update: $update, where: $where) {
      types: interfaceTypes {
        __typename
        id
      }
    }
  }
`)

export const UpdateReactNodeTypesDocument = graphql(`
  mutation UpdateReactNodeTypes(
    $update: ReactNodeTypeUpdateInput
    $where: ReactNodeTypeWhere
  ) {
    types: updateReactNodeTypes(update: $update, where: $where) {
      types: reactNodeTypes {
        __typename
        id
      }
    }
  }
`)

export const UpdateElementTypesDocument = graphql(`
  mutation UpdateElementTypes(
    $update: ElementTypeUpdateInput
    $where: ElementTypeWhere
  ) {
    types: updateElementTypes(update: $update, where: $where) {
      types: elementTypes {
        __typename
        id
      }
    }
  }
`)

export const UpdateRenderPropTypesDocument = graphql(`
  mutation UpdateRenderPropTypes(
    $update: RenderPropTypeUpdateInput
    $where: RenderPropTypeWhere
  ) {
    types: updateRenderPropTypes(update: $update, where: $where) {
      types: renderPropTypes {
        __typename
        id
      }
    }
  }
`)

export const UpdateEnumTypesDocument = graphql(`
  mutation UpdateEnumTypes(
    $update: EnumTypeUpdateInput
    $where: EnumTypeWhere
  ) {
    types: updateEnumTypes(update: $update, where: $where) {
      types: enumTypes {
        __typename
        id
      }
    }
  }
`)

export const UpdateLambdaTypesDocument = graphql(`
  mutation UpdateLambdaTypes(
    $update: LambdaTypeUpdateInput
    $where: LambdaTypeWhere
  ) {
    types: updateLambdaTypes(update: $update, where: $where) {
      types: lambdaTypes {
        __typename
        id
      }
    }
  }
`)

export const UpdatePageTypesDocument = graphql(`
  mutation UpdatePageTypes(
    $update: PageTypeUpdateInput
    $where: PageTypeWhere
  ) {
    types: updatePageTypes(update: $update, where: $where) {
      types: pageTypes {
        __typename
        id
      }
    }
  }
`)

export const UpdateAppTypesDocument = graphql(`
  mutation UpdateAppTypes($update: AppTypeUpdateInput, $where: AppTypeWhere) {
    types: updateAppTypes(update: $update, where: $where) {
      types: appTypes {
        __typename
        id
      }
    }
  }
`)

export const UpdateRichTextTypesDocument = graphql(`
  mutation UpdateRichTextTypes(
    $update: RichTextTypeUpdateInput
    $where: RichTextTypeWhere
  ) {
    types: updateRichTextTypes(update: $update, where: $where) {
      types: richTextTypes {
        __typename
        id
      }
    }
  }
`)

export const UpdateActionTypesDocument = graphql(`
  mutation UpdateActionTypes(
    $update: ActionTypeUpdateInput
    $where: ActionTypeWhere
  ) {
    types: updateActionTypes(update: $update, where: $where) {
      types: actionTypes {
        __typename
        id
      }
    }
  }
`)

export const UpdateCodeMirrorTypesDocument = graphql(`
  mutation UpdateCodeMirrorTypes(
    $update: CodeMirrorTypeUpdateInput
    $where: CodeMirrorTypeWhere
  ) {
    types: updateCodeMirrorTypes(update: $update, where: $where) {
      types: codeMirrorTypes {
        __typename
        id
      }
    }
  }
`)
