import type { IRef } from '@codelab/shared/abstract/core'

import {
  ICodeMirrorLanguage,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

/**
 * Difficult to type this function, we just let it infer
 */
export const systemTypesData = (owner: IRef) => ({
  [ICodeMirrorLanguage.Css]: {
    __typename: ITypeKind.CodeMirrorType,
    id: v4(),
    kind: ITypeKind.CodeMirrorType,
    language: ICodeMirrorLanguage.Css,
    name: `${ICodeMirrorLanguage.Css} Code`,
    owner,
  } as const,
  [ICodeMirrorLanguage.CssInJs]: {
    __typename: ITypeKind.CodeMirrorType,
    id: v4(),
    kind: ITypeKind.CodeMirrorType,
    language: ICodeMirrorLanguage.CssInJs,
    name: `${ICodeMirrorLanguage.CssInJs} Code`,
    owner,
  } as const,
  [ICodeMirrorLanguage.Graphql]: {
    __typename: ITypeKind.CodeMirrorType,
    id: v4(),
    kind: ITypeKind.CodeMirrorType,
    language: ICodeMirrorLanguage.Graphql,
    name: `${ICodeMirrorLanguage.Graphql} Code`,
    owner,
  } as const,
  [ICodeMirrorLanguage.Javascript]: {
    __typename: ITypeKind.CodeMirrorType,
    id: v4(),
    kind: ITypeKind.CodeMirrorType,
    language: ICodeMirrorLanguage.Javascript,
    name: `${ICodeMirrorLanguage.Javascript} Code`,
    owner,
  } as const,
  [ICodeMirrorLanguage.Json]: {
    __typename: ITypeKind.CodeMirrorType,
    id: v4(),
    kind: ITypeKind.CodeMirrorType,
    language: ICodeMirrorLanguage.Json,
    name: `${ICodeMirrorLanguage.Json} Code`,
    owner,
  } as const,
  [ICodeMirrorLanguage.Typescript]: {
    __typename: ITypeKind.CodeMirrorType,
    id: v4(),
    kind: ITypeKind.CodeMirrorType,
    language: ICodeMirrorLanguage.Typescript,
    name: `${ICodeMirrorLanguage.Typescript} Code`,
    owner,
  } as const,
  [IPrimitiveTypeKind.Boolean]: {
    __typename: ITypeKind.PrimitiveType,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.Boolean,
    owner,
    primitiveKind: IPrimitiveTypeKind.Boolean,
  } as const,
  [IPrimitiveTypeKind.Integer]: {
    __typename: ITypeKind.PrimitiveType,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.Integer,
    owner,
    primitiveKind: IPrimitiveTypeKind.Integer,
  } as const,
  [IPrimitiveTypeKind.Number]: {
    __typename: ITypeKind.PrimitiveType,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.Number,
    owner,
    primitiveKind: IPrimitiveTypeKind.Number,
  } as const,
  /**
   * PrimitiveTypes
   */
  [IPrimitiveTypeKind.String]: {
    __typename: ITypeKind.PrimitiveType,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.String,
    owner,
    primitiveKind: IPrimitiveTypeKind.String,
  } as const,
  [ITypeKind.ActionType]: {
    __typename: ITypeKind.ActionType,
    id: v4(),
    kind: ITypeKind.ActionType,
    name: ITypeKind.ActionType,
    owner,
  } as const,
  /**
   * Other types
   */
  [ITypeKind.ReactNodeType]: {
    __typename: ITypeKind.ReactNodeType,
    id: v4(),
    kind: ITypeKind.ReactNodeType,
    name: ITypeKind.ReactNodeType,
    owner,
  } as const,
  [ITypeKind.RenderPropType]: {
    __typename: ITypeKind.RenderPropType,
    id: v4(),
    kind: ITypeKind.RenderPropType,
    name: ITypeKind.RenderPropType,
    owner,
  } as const,
  [ITypeKind.RichTextType]: {
    __typename: ITypeKind.RichTextType,
    id: v4(),
    kind: ITypeKind.RichTextType,
    name: ITypeKind.RichTextType,
    owner,
  } as const,
})
