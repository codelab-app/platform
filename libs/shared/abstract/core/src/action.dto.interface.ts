import type {
  IDiscriminatedEntity,
  IEntity,
} from '@codelab/shared/abstract/types'
import type { IActionKind } from './action-kind.enum'

export interface IBaseActionDTO {
  __typename?: `${IActionKind.ApiAction}` | `${IActionKind.CodeAction}`
  id: string
  name: string
  store: IEntity
}
export interface ICodeActionDTO extends IBaseActionDTO {
  __typename?: `${IActionKind.CodeAction}`
  code: string
}

export type IActionEntity =
  | IDiscriminatedEntity<`${IActionKind.ApiAction}`>
  | IDiscriminatedEntity<`${IActionKind.CodeAction}`>

export interface IApiActionDTO extends IBaseActionDTO {
  __typename?: `${IActionKind.ApiAction}`
  config: IEntity
  errorAction?: IActionEntity | null
  resource: IEntity
  successAction?: IActionEntity | null
}

export type IActionDTO = IApiActionDTO | ICodeActionDTO
