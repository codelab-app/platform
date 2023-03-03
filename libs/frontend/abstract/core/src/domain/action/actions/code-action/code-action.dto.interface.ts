import type { IActionKind } from '@codelab/shared/abstract/core'
import type { IBaseActionDTO } from '../../action.dto.interface'

export interface ICodeActionDTO extends IBaseActionDTO {
  // Used as discriminator
  __typename: `${IActionKind.CodeAction}`
  code: string
}
