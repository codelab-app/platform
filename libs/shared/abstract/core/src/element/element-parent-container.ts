import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IDiscriminatedRef } from './model/node-type.interface'

export enum IElementParentContainerKind {
  Component = 'Component',
  Page = 'Page',
}

export const IElementParentContainer = Type.Union([
  // IDiscriminatedEntity('Component'),
  // IDiscriminatedEntity('Page'),
  IDiscriminatedRef('Component'),
  IDiscriminatedRef('Page'),
])

export type IElementParentContainer = Static<typeof IElementParentContainer>
