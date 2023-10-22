import type { ICodeActionDTO, IRef } from '@codelab/shared/abstract/core'
import { IActionKind } from '@codelab/shared/abstract/core'

export class CodeAction implements ICodeActionDTO {
  __typename: `${IActionKind.CodeAction}` = `${IActionKind.CodeAction}`

  code: string

  id: string

  name: string

  store: IRef

  constructor({ code, id, name, store }: ICodeActionDTO) {
    this.id = id
    this.name = name
    this.code = code
    this.store = store
  }
}
