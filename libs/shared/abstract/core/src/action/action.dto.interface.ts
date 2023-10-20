import { type Static, Type } from '@sinclair/typebox'
import { IApiAction, IApiActionDTO } from './api-action.dto.interface'
import { ICodeAction, ICodeActionDTO } from './code-action.dto.interface'

export const IActionDTO = Type.Union([IApiActionDTO, ICodeActionDTO])

export type IActionDTO = Static<typeof IActionDTO>

export const IAction = Type.Union([IApiAction, ICodeAction], {
  discriminantKey: '__typename',
  errorMessage: 'Unknown type',
})

export type IAction = Static<typeof IAction>
