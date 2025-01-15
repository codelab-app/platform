import type { IRef, ITypeDto } from '@codelab/shared/abstract/core'

import {
  ICodeMirrorLanguage,
  IPrimitiveTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

/**
 * Difficult to type this function, we just let it infer
 */
export const systemTypesData = (owner: IRef): Array<ITypeDto> => [
  {
    __typename: ITypeKind.CodeMirrorType,
    id: v4(),
    kind: ITypeKind.CodeMirrorType,
    language: ICodeMirrorLanguage.Css,
    name: `${ICodeMirrorLanguage.Css} Code`,
    owner,
  },
  {
    __typename: ITypeKind.CodeMirrorType,
    id: v4(),
    kind: ITypeKind.CodeMirrorType,
    language: ICodeMirrorLanguage.CssInJs,
    name: `${ICodeMirrorLanguage.CssInJs} Code`,
    owner,
  },
  {
    __typename: ITypeKind.CodeMirrorType,
    id: v4(),
    kind: ITypeKind.CodeMirrorType,
    language: ICodeMirrorLanguage.Graphql,
    name: `${ICodeMirrorLanguage.Graphql} Code`,
    owner,
  },
  {
    __typename: ITypeKind.CodeMirrorType,
    id: v4(),
    kind: ITypeKind.CodeMirrorType,
    language: ICodeMirrorLanguage.Javascript,
    name: `${ICodeMirrorLanguage.Javascript} Code`,
    owner,
  },
  {
    __typename: ITypeKind.CodeMirrorType,
    id: v4(),
    kind: ITypeKind.CodeMirrorType,
    language: ICodeMirrorLanguage.Json,
    name: `${ICodeMirrorLanguage.Json} Code`,
    owner,
  },
  {
    __typename: ITypeKind.CodeMirrorType,
    id: v4(),
    kind: ITypeKind.CodeMirrorType,
    language: ICodeMirrorLanguage.Typescript,
    name: `${ICodeMirrorLanguage.Typescript} Code`,
    owner,
  },
  {
    __typename: ITypeKind.PrimitiveType,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.Boolean,
    owner,
    primitiveKind: IPrimitiveTypeKind.Boolean,
  },
  {
    __typename: ITypeKind.PrimitiveType,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.Integer,
    owner,
    primitiveKind: IPrimitiveTypeKind.Integer,
  },
  {
    __typename: ITypeKind.PrimitiveType,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.Number,
    owner,
    primitiveKind: IPrimitiveTypeKind.Number,
  },
  /**
   * PrimitiveTypes
   */
  {
    __typename: ITypeKind.PrimitiveType,
    id: v4(),
    kind: ITypeKind.PrimitiveType,
    name: IPrimitiveTypeKind.String,
    owner,
    primitiveKind: IPrimitiveTypeKind.String,
  },
  {
    __typename: ITypeKind.ActionType,
    id: v4(),
    kind: ITypeKind.ActionType,
    name: ITypeKind.ActionType,
    owner,
  },
  /**
   * Other types
   */
  {
    __typename: ITypeKind.ReactNodeType,
    id: v4(),
    kind: ITypeKind.ReactNodeType,
    name: ITypeKind.ReactNodeType,
    owner,
  },
  {
    __typename: ITypeKind.RenderPropType,
    id: v4(),
    kind: ITypeKind.RenderPropType,
    name: ITypeKind.RenderPropType,
    owner,
  },
  {
    __typename: ITypeKind.RichTextType,
    id: v4(),
    kind: ITypeKind.RichTextType,
    name: ITypeKind.RichTextType,
    owner,
  },
]
