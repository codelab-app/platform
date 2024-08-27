import type { IComponentDomainService } from '@codelab/frontend/abstract/domain'
import { chance } from '@codelab/frontend-domain-shared'
import type { IComponentDto } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const componentFactory =
  (componentDomainService: IComponentDomainService) =>
  (dto: Partial<IComponentDto>) => {
    const component: IComponentDto = {
      api: {
        id: dto.api?.id ?? v4(),
      },
      id: dto.id ?? v4(),
      name: dto.name ?? chance.word({ capitalize: true }),
      owner: {
        id: dto.owner?.id ?? v4(),
      },
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

    return componentDomainService.hydrate(component)
  }
