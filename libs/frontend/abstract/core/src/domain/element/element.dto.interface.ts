import {
  IElementDTO,
  type IElementRenderType,
  IPropDTO,
} from '@codelab/shared/abstract/core'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import type { Overwrite } from 'utility-types'

export const ICreateElementData = Type.Composite([
  Type.Pick(IElementDTO, [
    'id',
    'name',
    'parentElement',
    'postRenderAction',
    'preRenderAction',
    'prevSibling',
    'renderType',
    'style',
    'closestContainerNode',
  ]),
  Type.Object({
    props: Type.Optional(Type.Pick(IPropDTO, ['data'])),
  }),
])

export type ICreateElementSchema = Overwrite<
  ICreateElementData,
  { renderType: IElementRenderType | null }
>

export type ICreateElementData = Static<typeof ICreateElementData>

export const IUpdateElementData = Type.Pick(IElementDTO, [
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
])

export type IUpdateElementData = Static<typeof IUpdateElementData>

/**
 * Some properties have their own forms, the base form only uses a subset of fields
 */
export type IUpdateBaseElementData = Omit<IUpdateElementData, 'style'>
