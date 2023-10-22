import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IActionKind } from '../action-kind.enum'
import { IDiscriminatedRef } from '../model/node-type.interface'

/**
 * This is typed entity, otherwise ID isn't enough for factory
 */
const ApiActionEntity = IDiscriminatedRef(`${IActionKind.ApiAction}`)
const CodeActionEntity = IDiscriminatedRef(`${IActionKind.CodeAction}`)

export const IActionEntity = Type.Union([ApiActionEntity, CodeActionEntity])

export type IActionEntity = Static<typeof IActionEntity>
