import type { ICreateTypeInput } from '@codelab/frontend/abstract/domain'
import type { IRef } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'

type CreateTypesRecord = Record<
  ITypeKind,
  (input: Array<ICreateTypeInput>) => Promise<Array<IRef>>
>

export const createTypeApi: CreateTypesRecord = {
  [ITypeKind.AppType]: (input) =>
    _createApi.CreateAppTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.ActionType]: (input) =>
    _createApi.CreateActionTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.PrimitiveType]: (input) =>
    _createApi
      .CreatePrimitiveTypes({
        input: input as ArrayOrSingle<PrimitiveTypeCreateInput>,
      })
      .then(({ types }) => types.types),
  [ITypeKind.ArrayType]: (input) =>
    _createApi.CreateArrayTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.InterfaceType]: (input) =>
    _createApi
      .CreateInterfaceTypes({ input: input })
      .then(({ types }) => types.types),
  [ITypeKind.EnumType]: (input) =>
    _createApi.CreateEnumTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.LambdaType]: (input) =>
    _createApi.CreateLambdaTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.ElementType]: (input) =>
    _createApi
      .CreateElementTypes({
        input: input as ArrayOrSingle<ElementTypeCreateInput>,
      })
      .then(({ types }) => types.types),
  [ITypeKind.RenderPropType]: (input) =>
    _createApi
      .CreateRenderPropTypes({ input })
      .then(({ types }) => types.types),
  [ITypeKind.RichTextType]: (input) =>
    _createApi.CreateRichTextTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.ReactNodeType]: (input) =>
    _createApi
      .CreateReactNodeTypes({
        input: input as ArrayOrSingle<ReactNodeTypeCreateInput>,
      })
      .then(({ types }) => types.types),
  [ITypeKind.UnionType]: (input) =>
    _createApi.CreateUnionTypes({ input }).then(({ types }) => types.types),
  [ITypeKind.CodeMirrorType]: (input) =>
    _createApi
      .CreateCodeMirrorTypes({
        input: input as ArrayOrSingle<CodeMirrorTypeCreateInput>,
      })
      .then(({ types }) => types.types),
  [ITypeKind.PageType]: (input) =>
    _createApi.CreatePageTypes({ input }).then(({ types }) => types.types),
}
