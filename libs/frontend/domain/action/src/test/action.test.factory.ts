import type { IActionDomainService } from '@codelab/frontend/abstract/domain'
import type {
  IApiActionDto,
  ICodeActionDto,
} from '@codelab/shared/abstract/core'

import { propFactory } from '@codelab/frontend-domain-prop/test'
import { chance } from '@codelab/frontend-domain-shared'
import { IActionKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const codeActionFactory =
  (actionDomainService: IActionDomainService) =>
  (dto: Partial<ICodeActionDto>) => {
    const action: ICodeActionDto = {
      __typename: IActionKind.CodeAction,
      code: dto.code ?? 'function run(){}',
      id: dto.id ?? v4(),
      name: dto.name ?? `${chance.word({ capitalize: true })} Action`,
      store: { id: dto.store?.id ?? v4() },
    }

    return actionDomainService.hydrate(action)
  }

export const apiActionFactory =
  (actionDomainService: IActionDomainService) =>
  (dto: Partial<IApiActionDto>) => {
    const action: IApiActionDto = {
      __typename: IActionKind.ApiAction,
      config: propFactory(dto.config).toJson,
      errorAction: dto.errorAction,
      id: dto.id ?? v4(),
      name: dto.name ?? `${chance.word({ capitalize: true })} Action`,
      resource: dto.resource ?? { id: v4() },
      store: { id: dto.store?.id ?? v4() },
      successAction: dto.successAction,
    }

    return actionDomainService.hydrate(action)
  }
