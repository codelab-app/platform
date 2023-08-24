import { IDiscriminatedEntity } from '@codelab/shared/abstract/types'
import { type Static, Type } from '@sinclair/typebox'
import { IActionKind } from '../action-kind.enum'
import { IApiActionDTO } from './api-action.dto.interface'
import { ICodeActionDTO } from './code-action.dto.interface'

export const IActionDTO = Type.Union([IApiActionDTO, ICodeActionDTO])

export type IActionDTO = Static<typeof IActionDTO>

/**
 * This is typed entity, otherwise ID isn't enough for factory
 */
const ApiActionEntity = IDiscriminatedEntity(`${IActionKind.ApiAction}`)
const CodeActionEntity = IDiscriminatedEntity(`${IActionKind.CodeAction}`)

export const IActionEntity = Type.Union([ApiActionEntity, CodeActionEntity])

export type IActionEntity = Static<typeof IActionEntity>
