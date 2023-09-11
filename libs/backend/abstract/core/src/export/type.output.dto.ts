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
import type { Static, TObject } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

/**
 * For output need to
 *
 * 1) override with required __typename
 * 2) remove owner
 */
export const TypeOutput = <T extends TObject>(schema: T) =>
  Type.Composite([
    Type.Omit(schema, ['owner', '__typename']),
    Type.Required(Type.Pick(schema, ['__typename'])),
  ])

export const ITypeOutputDto = Type.Union(
  [
    TypeOutput(IActionTypeDTO),
    TypeOutput(IAppTypeDTO),
    TypeOutput(IArrayTypeDTO),
    TypeOutput(ICodeMirrorTypeDTO),
    TypeOutput(IElementTypeDTO),
    TypeOutput(IEnumTypeDTO),
    TypeOutput(IInterfaceTypeDTO),
    TypeOutput(ILambdaTypeDTO),
    TypeOutput(IPageTypeDTO),
    TypeOutput(IPrimitiveTypeDTO),
    TypeOutput(IReactNodeTypeDTO),
    TypeOutput(IRenderPropTypeDTO),
    TypeOutput(IUnionTypeDTO),
  ],
  {
    discriminantKey: '__typename',
  },
)

export type ITypeOutputDto = Static<typeof ITypeOutputDto>
