import { type Static, Type } from '@sinclair/typebox'
import { IApiAction, IApiActionDto } from './api-action.dto.interface'
import { ICodeAction, ICodeActionDto } from './code-action.dto.interface'

export const IActionDto = Type.Union([IApiActionDto, ICodeActionDto])

export type IActionDto = Static<typeof IActionDto>

export const IAction = Type.Union([IApiAction, ICodeAction], {
  discriminantKey: '__typename',
  errorMessage: 'Unknown type',
})

export type IAction = Static<typeof IAction>
