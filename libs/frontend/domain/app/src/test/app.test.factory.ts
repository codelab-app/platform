import type { IRootStore } from '@codelab/frontend/abstract/application'
import { chance } from '@codelab/frontend/domain/shared'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const AppTestFactory = (rootStore: Partial<IRootStore>) =>
  Factory.define<IAppDTO>(({ params }) => {
    const dto: IAppDTO = {
      domains: params.domains,
      id: params.id ?? v4(),
      name: params.name ?? chance.word({ capitalize: true }),
      owner: { id: params.owner?.id ?? v4() },
      pages: params.pages,
    }

    rootStore.appService?.appDomainService.hydrate(dto)

    return dto
  })
