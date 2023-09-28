import {
  IDiscriminatedEntity,
  IMaybeDiscriminatedEntity,
} from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export enum IElementRenderTypeKind {
  Atom = 'Atom',
  Component = 'Component',
}

export const IComponentID = Type.String()

export const IAtomID = Type.String()

export const IElementRenderTypeDto = Type.Union([
  IDiscriminatedEntity(`${IElementRenderTypeKind.Atom}`),
  IDiscriminatedEntity(`${IElementRenderTypeKind.Component}`),
])

export type IElementRenderTypeDto = Static<typeof IElementRenderTypeDto>
