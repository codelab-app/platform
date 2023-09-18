import type { Atom, Component } from '@codelab/backend/abstract/codegen'
import {
  IDiscriminatedEntity,
  IMaybeDiscriminatedEntity,
} from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IAtomDTO } from './atom.dto.interface'
import { IComponentDTO } from './component.dto.interface'

export enum IElementRenderTypeKind {
  Atom = 'Atom',
  Component = 'Component',
}

export const IComponentID = Type.String()

export const IAtomID = Type.String()

export const IElementRenderType = Type.Union([
  IDiscriminatedEntity(`${IElementRenderTypeKind.Atom}`),
  IDiscriminatedEntity(`${IElementRenderTypeKind.Component}`),
])

export type IElementRenderType = Static<typeof IElementRenderType>
