import {
  ICodeMirrorLanguage,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

/**
 * Difficult to type this function, we just let it infer
 */
export const systemTypesData = () => ({
  /**
   * PrimitiveTypes
   */
  [IPrimitiveTypeKind.String]: {
    __typename: ITypeKind.PrimitiveType,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.String,
    primitiveKind: IPrimitiveTypeKind.String,
  } as const,
  [IPrimitiveTypeKind.Boolean]: {
    __typename: ITypeKind.PrimitiveType,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.Boolean,
    primitiveKind: IPrimitiveTypeKind.Boolean,
  } as const,
  [IPrimitiveTypeKind.Number]: {
    __typename: ITypeKind.PrimitiveType,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.Number,
    primitiveKind: IPrimitiveTypeKind.Number,
  } as const,
  [IPrimitiveTypeKind.Integer]: {
    __typename: ITypeKind.PrimitiveType,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.Integer,
    primitiveKind: IPrimitiveTypeKind.Integer,
  } as const,
  /**
   * Other types
   */
  [ITypeKind.ReactNodeType]: {
    __typename: ITypeKind.ReactNodeType,
    id: v4(),
    kind: ITypeKind.ReactNodeType,
    name: ITypeKind.ReactNodeType,
  } as const,
  [ITypeKind.RenderPropType]: {
    __typename: ITypeKind.RenderPropType,
    id: v4(),
    kind: ITypeKind.RenderPropType,
    name: ITypeKind.RenderPropType,
  } as const,
  [ITypeKind.ActionType]: {
    __typename: ITypeKind.ActionType,
    id: v4(),
    kind: ITypeKind.ActionType,
    name: ITypeKind.ActionType,
  } as const,
  [ITypeKind.RichTextType]: {
    __typename: ITypeKind.RichTextType,
    id: v4(),
    kind: ITypeKind.RichTextType,
    name: ITypeKind.RichTextType,
  } as const,
  [ICodeMirrorLanguage.Typescript]: {
    __typename: ITypeKind.CodeMirrorType,
    id: v4(),
    kind: ITypeKind.CodeMirrorType,
    language: ICodeMirrorLanguage.Typescript,
    name: `${ICodeMirrorLanguage.Typescript} Code`,
  } as const,
  [ICodeMirrorLanguage.Javascript]: {
    __typename: ITypeKind.CodeMirrorType,
    id: v4(),
    kind: ITypeKind.CodeMirrorType,
    language: ICodeMirrorLanguage.Javascript,
    name: `${ICodeMirrorLanguage.Javascript} Code`,
  } as const,
  [ICodeMirrorLanguage.Css]: {
    __typename: ITypeKind.CodeMirrorType,
    id: v4(),
    kind: ITypeKind.CodeMirrorType,
    language: ICodeMirrorLanguage.Css,
    name: `${ICodeMirrorLanguage.Css} Code`,
  } as const,
  [ICodeMirrorLanguage.CssInJs]: {
    __typename: ITypeKind.CodeMirrorType,
    id: v4(),
    kind: ITypeKind.CodeMirrorType,
    language: ICodeMirrorLanguage.CssInJs,
    name: `${ICodeMirrorLanguage.CssInJs} Code`,
  } as const,
  [ICodeMirrorLanguage.Graphql]: {
    __typename: ITypeKind.CodeMirrorType,
    id: v4(),
    kind: ITypeKind.CodeMirrorType,
    language: ICodeMirrorLanguage.Graphql,
    name: `${ICodeMirrorLanguage.Graphql} Code`,
  } as const,
  [ICodeMirrorLanguage.Json]: {
    __typename: ITypeKind.CodeMirrorType,
    id: v4(),
    kind: ITypeKind.CodeMirrorType,
    language: ICodeMirrorLanguage.Json,
    name: `${ICodeMirrorLanguage.Json} Code`,
  } as const,
})
