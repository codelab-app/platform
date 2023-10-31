import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IActionKind } from './action-kind.enum'
import { IDiscriminatedRef } from '../model/node-type.interface'

/**
 * This is typed entity, otherwise ID isn't enough for factory
 */
const ApiActionRef = IDiscriminatedRef(`${IActionKind.ApiAction}`)
const CodeActionRef = IDiscriminatedRef(`${IActionKind.CodeAction}`)

export const IActionRef = Type.Union([ApiActionRef, CodeActionRef])

export type IActionRef = Static<typeof IActionRef>
