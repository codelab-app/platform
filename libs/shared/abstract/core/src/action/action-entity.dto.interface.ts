import type { Static } from '@sinclair/typebox'

import { Typebox } from '@codelab/shared-infra-typebox'
import { Type } from '@sinclair/typebox'

import { IActionKind } from './action-kind.enum'

/**
 * This is typed entity, otherwise ID isn't enough for factory
 */
const ApiActionRefSchema = Typebox.DiscriminatedRef(IActionKind.ApiAction)
const CodeActionRefSchema = Typebox.DiscriminatedRef(IActionKind.CodeAction)

export const ActionRefSchema = Type.Union([
  ApiActionRefSchema,
  CodeActionRefSchema,
])

export type IActionRef = Static<typeof ActionRefSchema>
