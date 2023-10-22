import { IDiscriminatedEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'

export enum IRedirectKind {
  Page = 'Page',
  Url = 'Url',
}

export const IPageID = Type.String()

export const IUrlID = Type.String()

export const IRedirectDto = Type.Union([
  IDiscriminatedEntity(`${IRedirectKind.Page}`),
  IDiscriminatedEntity(`${IRedirectKind.Url}`),
])

export type IRedirectDto = Static<typeof IRedirectDto>
