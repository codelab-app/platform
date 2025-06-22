import type { IActionDto } from '@codelab/shared-abstract-core'

import { PropRepository } from '@codelab/backend-domain-prop'
import { IActionKind } from '@codelab/shared-abstract-core'
import { Injectable } from '@nestjs/common'

import { CodeAction } from '../model/code-action.model'
import { ApiActionRepository } from './api-action.repo.service'
import { CodeActionRepository } from './code-action.repo.service'

@Injectable()
export class ActionFactory {
  constructor(
    private readonly apiActionRepository: ApiActionRepository,
    private readonly codeActionRepository: CodeActionRepository,
    private readonly propRepository: PropRepository,
  ) {}

  async save(action: IActionDto) {
    switch (action.__typename) {
      case IActionKind.ApiAction: {
        await this.propRepository.save(action.config)

        return await this.apiActionRepository.save(action)
      }

      case IActionKind.CodeAction: {
        const codeAction = new CodeAction(action)

        return await this.codeActionRepository.save(codeAction)
      }

      default: {
        throw new Error('No ActionFactory found')
      }
    }
  }
}

// export const exportActions = async (
//   storeId: string,
// ): Promise<Array<IActionExport>> => {
//   const CodeAction = await Repository.instance.CodeAction
//   const ApiAction = await Repository.instance.ApiAction

//   const codeActions = await CodeAction.find({
//     selectionSet: exportCodeActionSelectionSet,
//     where: { store: { id: storeId } },
//   })

//   const apiActions = await ApiAction.find({
//     selectionSet: exportApiActionSelectionSet,
//     where: { store: { id: storeId } },
//   })

//   return [...codeActions, ...apiActions]
// }
