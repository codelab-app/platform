import type { IRootStore } from '@codelab/frontend/abstract/application'
import { chance } from '@codelab/frontend/domain/shared'
import type { IPageDTO } from '@codelab/shared/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const PageTestFactory = (rootStore: Partial<IRootStore>) =>
  Factory.define<IPageDTO>(({ params }) => {
    const dto: IPageDTO = {
      app: { id: params.app?.id ?? v4() },
      id: params.id ?? v4(),
      kind: params.kind ?? IPageKind.Regular,
      name: params.name ?? chance.word(),
      rootElement: { id: params.rootElement?.id ?? v4() },
      store: { id: params.store?.id ?? v4() },
      url: chance.word(),
    }

    rootStore.appService?.appDomainService.app(dto.app.id)?.addPageInCache(dto)

    return dto
  })
