import type {
  IComponentModel,
  IRootDomainStore,
} from '@codelab/frontend/abstract/domain'
import { chance } from '@codelab/frontend/domain/shared'
import type { IComponentDTO } from '@codelab/shared/abstract/core'
import type { DeepPartial } from 'fishery'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const ComponentTestFactory = (rootStore: Partial<IRootDomainStore>) =>
  Factory.define<IComponentModel, IComponentDTO>(({ transientParams }) => {
    const dto: IComponentDTO = {
      api: {
        id: transientParams.api?.id ?? v4(),
      },
      childrenContainerElement: {
        id: transientParams.childrenContainerElement?.id ?? v4(),
      },
      id: transientParams.id ?? v4(),
      name: transientParams.name ?? chance.word({ capitalize: true }),
      props: {
        // TODO: data here wont be used at all, we should fix the typings around the component props in the DTO
        data: '{}',
        id: transientParams.props?.id ?? v4(),
      },
      rootElement: {
        id: transientParams.rootElement?.id ?? v4(),
      },
      store: {
        id: transientParams.store?.id ?? v4(),
      },
    }

    const model = rootStore.componentDomainService?.hydrate(dto)

    return model!
  })

export const componentFactory =
  (rootStore: IRootDomainStore) => (dto: DeepPartial<IComponentDTO>) => {
    const component: IComponentDTO = {
      api: {
        id: dto.api?.id ?? v4(),
      },
      childrenContainerElement: {
        id: dto.childrenContainerElement?.id ?? v4(),
      },
      id: dto.id ?? v4(),
      name: dto.name ?? chance.word({ capitalize: true }),
      props: {
        // TODO: data here wont be used at all, we should fix the typings around the component props in the DTO
        data: '{}',
        id: dto.props?.id ?? v4(),
      },
      rootElement: {
        id: dto.rootElement?.id ?? v4(),
      },
      store: {
        id: dto.store?.id ?? v4(),
      },
    }

    return rootStore.componentDomainService.hydrate(component)
  }
