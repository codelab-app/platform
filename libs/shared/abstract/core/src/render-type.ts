import { RenderTypeKind } from '@codelab/shared/abstract/codegen'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

/**
 *  @deprecated We have to use the copy from codegen, otherwise they don't match up
 */
export enum __RenderTypeKind {
  Atom = 'Atom',
  Component = 'Component',
}

export { RenderTypeKind as IRenderTypeKind }

export const IComponentID = Type.String()

export const IAtomID = Type.String()

export const RenderType = Type.Object({
  id: Type.Union([IAtomID, IComponentID]),
  kind: Type.Enum(RenderTypeKind),
})

export type RenderType = Static<typeof RenderType>
