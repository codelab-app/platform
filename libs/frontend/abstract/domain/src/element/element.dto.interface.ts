import { ElementDtoSchema, IElementDto } from '@codelab/shared/abstract/core'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

/**
 * This is the element data, without context data like page etc
 */
// export const ICreateElementData = Type.Pick(IElementDto, ['atom'])

export const CSS_AUTOSAVE_TIMEOUT = 1000

export const UpdateElementDataSchema = Type.Pick(ElementDtoSchema, [
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

export type IUpdateElementData = Static<typeof UpdateElementDataSchema>

/**
 * Some properties have their own forms, the base form only uses a subset of fields
 */
export type IUpdateBaseElementData = Omit<IUpdateElementData, 'style'>
