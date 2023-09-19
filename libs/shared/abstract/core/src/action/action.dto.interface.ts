import { type Static, Type } from '@sinclair/typebox'
import { IApiActionDTO } from './api-action.dto.interface'
import { ICodeActionDTO } from './code-action.dto.interface'

export const IActionDTO = Type.Union([IApiActionDTO, ICodeActionDTO])

export type IActionDTO = Static<typeof IActionDTO>
