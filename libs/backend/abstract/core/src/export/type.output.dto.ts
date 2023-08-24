import {
  IActionTypeDTO,
  IAppTypeDTO,
  IArrayTypeDTO,
  ICodeMirrorTypeDTO,
  IElementTypeDTO,
  IEnumTypeDTO,
  IInterfaceTypeDTO,
  ILambdaTypeDTO,
  IPageTypeDTO,
  IPrimitiveTypeDTO,
  IReactNodeTypeDTO,
  IRenderPropTypeDTO,
  IUnionTypeDTO,
} from '@codelab/shared/abstract/core'
import { Typebox } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const ITypeOutputDto = Type.Union([
  Typebox.OmitOwner(IActionTypeDTO),
  Typebox.OmitOwner(IAppTypeDTO),
  Typebox.OmitOwner(IArrayTypeDTO),
  Typebox.OmitOwner(ICodeMirrorTypeDTO),
  Typebox.OmitOwner(IElementTypeDTO),
  Typebox.OmitOwner(IEnumTypeDTO),
  Typebox.OmitOwner(IInterfaceTypeDTO),
  Typebox.OmitOwner(ILambdaTypeDTO),
  Typebox.OmitOwner(IPageTypeDTO),
  Typebox.OmitOwner(IPrimitiveTypeDTO),
  Typebox.OmitOwner(IReactNodeTypeDTO),
  Typebox.OmitOwner(IRenderPropTypeDTO),
  Typebox.OmitOwner(IUnionTypeDTO),
])

export type ITypeOutputDto = Static<typeof ITypeOutputDto>
