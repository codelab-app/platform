import type {
  CodeActionCreateInput,
  CodeActionDeleteInput,
  CodeActionUpdateInput,
} from '@codelab/shared/infra/gqlgen'

import {
  IActionKind,
  type ICodeActionDto,
  type IMapper,
} from '@codelab/shared/abstract/core'
import { connectNodeId } from '@codelab/shared/domain/orm'

export const codeActionMapper: IMapper<
  ICodeActionDto,
  CodeActionCreateInput,
  CodeActionUpdateInput,
  CodeActionDeleteInput
> = {
  toCreateInput: (dto: ICodeActionDto) => {
    const { code, id, name, store } = dto

    return {
      code,
      id,
      name,
      store: connectNodeId(store.id),
      type: IActionKind.CodeAction,
    }
  },
  toDeleteInput: (): CodeActionDeleteInput => ({}),
  toUpdateInput: (dto: ICodeActionDto): CodeActionUpdateInput => ({
    code: dto.code,
    name: dto.name,
  }),
}
