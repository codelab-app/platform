import { ElementRenderTypeKind } from '@codelab/shared/abstract/codegen'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

/**
 *  @deprecated We have to use the copy from codegen, otherwise they don't match up
 */
export enum __ElementRenderTypeKind {
  Atom = 'Atom',
  Component = 'Component',
}

export { ElementRenderTypeKind as IElementRenderTypeKind }

export const IComponentID = Type.String()

export const IAtomID = Type.String()

export const ElementRenderType = Type.Object({
  id: Type.Union([IAtomID, IComponentID]),
  kind: Type.Enum(ElementRenderTypeKind),
})

export type ElementRenderType = Static<typeof ElementRenderType>
