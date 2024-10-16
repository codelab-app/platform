import type { ICodeActionDto, IRef } from '@codelab/shared/abstract/core'

import { IActionKind } from '@codelab/shared/abstract/core'

export class CodeAction implements ICodeActionDto {
  __typename: `${IActionKind.CodeAction}` = IActionKind.CodeAction

  code: string

  id: string

  name: string

  store: IRef

  constructor({ code, id, name, store }: ICodeActionDto) {
    this.id = id
    this.name = name
    this.code = code
    this.store = store
  }
}
