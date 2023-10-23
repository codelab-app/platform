import type { IRootStore } from '@codelab/frontend/abstract/application'
import { chance } from '@codelab/frontend/domain/shared'
import type { IComponentDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'

export const ComponentTestFactory = (rootStore: Partial<IRootStore>) =>
  Factory.define<IComponentDTO>(({ params }) => {
    const dto: IComponentDTO = {
      api: {
        id: params.api?.id ?? v4(),
      },
      childrenContainerElement: {
        id: params.childrenContainerElement?.id ?? v4(),
      },
      id: params.id ?? v4(),
      keyGenerator:
        params.keyGenerator ??
        `function run(props) {
      // props are of type component api
        return props.id
    }`,
      name: params.name ?? chance.word({ capitalize: true }),
      props: {
        // TODO: data here wont be used at all, we should fix the typings around the component props in the DTO
        data: '{}',
        id: params.props?.id ?? v4(),
      },
      rootElement: {
        id: params.rootElement?.id ?? v4(),
      },
      store: {
        id: params.store?.id ?? v4(),
      },
    }

    rootStore.componentService?.hydrate(dto)

    return dto
  })
