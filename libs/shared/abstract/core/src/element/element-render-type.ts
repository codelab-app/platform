import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IDiscriminatedRef } from '../model/ref.interface'

export enum IElementRenderTypeKind {
  Atom = 'Atom',
  Component = 'Component',
}

export const IComponentID = Type.String()

export const IAtomID = Type.String()

const IAtomRenderType = IDiscriminatedRef(IElementRenderTypeKind.Atom)

export type IAtomRenderType = Static<typeof IAtomRenderType>

export const IElementRenderTypeDto = Type.Union([
  IAtomRenderType,
  IDiscriminatedRef(IElementRenderTypeKind.Component),
])

export type IElementRenderTypeDto = Static<typeof IElementRenderTypeDto>
