import { IMaybeDiscriminatedEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export enum IElementParentContainerKind {
  Component = 'Component',
  Page = 'Page',
}

export const IElementParentContainer = Type.Union([
  // IDiscriminatedEntity('Component'),
  // IDiscriminatedEntity('Page'),
  IMaybeDiscriminatedEntity('Component'),
  IMaybeDiscriminatedEntity('Page'),
])

export type IElementParentContainer = Static<typeof IElementParentContainer>
