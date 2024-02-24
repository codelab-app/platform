import { IElementDto } from '@codelab/shared/abstract/core'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export const IUpdateElementData = Type.Pick(IElementDto, [
  'childMapperComponent',
  'childMapperPreviousSibling',
  'childMapperPropKey',
  'id',
  'name',
  'postRenderAction',
  'preRenderAction',
  'renderForEachPropKey',
  'renderIfExpression',
  'renderType',
  'style',
  'tailwindClassNames',
])

export type IUpdateElementData = Static<typeof IUpdateElementData>

/**
 * Some properties have their own forms, the base form only uses a subset of fields
 */
export type IUpdateBaseElementData = Omit<IUpdateElementData, 'style'>
