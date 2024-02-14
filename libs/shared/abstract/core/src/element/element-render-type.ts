import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IDiscriminatedRef } from '../model/node-type.interface'

export enum IElementRenderTypeKind {
  Atom = 'Atom',
  Component = 'Component',
}

export const IComponentID = Type.String()

export const IAtomID = Type.String()

export const IElementRenderTypeDto = Type.Union([
  IDiscriminatedRef(`${IElementRenderTypeKind.Atom}`),
  IDiscriminatedRef(`${IElementRenderTypeKind.Component}`),
])

export type IElementRenderTypeDto = Static<typeof IElementRenderTypeDto>
