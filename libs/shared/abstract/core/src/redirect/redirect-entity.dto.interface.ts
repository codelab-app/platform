import { IMaybeDiscriminatedEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IRedirectKind } from './redirect-kind.enum'

/**
 * This is typed entity, otherwise ID isn't enough for factory
 */
const PageRedirectEntity = IMaybeDiscriminatedEntity(`${IRedirectKind.Page}`)
const UrlRedirectEntity = IMaybeDiscriminatedEntity(`${IRedirectKind.Url}`)

export const IRedirectEntity = Type.Union([
  PageRedirectEntity,
  UrlRedirectEntity,
])

export type IRedirectEntity = Static<typeof IRedirectEntity>
