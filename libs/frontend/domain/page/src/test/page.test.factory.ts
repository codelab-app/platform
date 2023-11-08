import type {
  IPageModel,
  IRootDomainStore,
} from '@codelab/frontend/abstract/domain'
import { chance } from '@codelab/frontend/domain/shared'
import type { IPageDTO } from '@codelab/shared/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import type { DeepPartial } from 'fishery'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const PageTestFactory = (rootStore: Partial<IRootDomainStore>) =>
  Factory.define<IPageModel, IPageDTO>(({ transientParams }) => {
    const dto: IPageDTO = {
      app: { id: transientParams.app?.id ?? v4() },
      id: transientParams.id ?? v4(),
      kind: transientParams.kind ?? IPageKind.Regular,
      name: transientParams.name ?? chance.word(),
      rootElement: { id: transientParams.rootElement?.id ?? v4() },
      store: { id: transientParams.store?.id ?? v4() },
      url: chance.word(),
    }

    const model = rootStore.appDomainService
      ?.app(dto.app.id)
      ?.addPageInCache(dto)

    return model!
  })

export const pageFactory =
  (rootStore: IRootDomainStore) => (dto: DeepPartial<IPageDTO>) => {
    const page: IPageDTO = {
      app: { id: dto.app?.id ?? v4() },
      id: dto.id ?? v4(),
      kind: dto.kind ?? IPageKind.Regular,
      name: dto.name ?? chance.word(),
      rootElement: { id: dto.rootElement?.id ?? v4() },
      store: { id: dto.store?.id ?? v4() },
      url: chance.word(),
    }

    return rootStore.pageDomainService.hydrate(page)
  }
