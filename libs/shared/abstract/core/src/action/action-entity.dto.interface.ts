import { IDiscriminatedEntity } from '@codelab/shared/abstract/types'
import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IActionKind } from '../action-kind.enum'

/**
 * This is typed entity, otherwise ID isn't enough for factory
 */
const ApiActionEntity = IDiscriminatedEntity(`${IActionKind.ApiAction}`)
const CodeActionEntity = IDiscriminatedEntity(`${IActionKind.CodeAction}`)

export const IActionEntity = Type.Union([ApiActionEntity, CodeActionEntity])

export type IActionEntity = Static<typeof IActionEntity>
