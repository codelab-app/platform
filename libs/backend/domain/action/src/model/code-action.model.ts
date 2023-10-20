import type { ICodeActionDTO } from '@codelab/shared/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'

export class CodeAction implements ICodeActionDTO {
  __typename: `${IActionKind.CodeAction}` = `${IActionKind.CodeAction}`

  code: string

  id: string

  name: string

  store: IEntity

  constructor({ code, id, name, store }: ICodeActionDTO) {
    this.id = id
    this.name = name
    this.code = code
    this.store = store
  }
}
