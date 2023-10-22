import type { IComponentDTO } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import chance from './chance'

export default Factory.define<IComponentDTO>(({ params }) => {
  const dto = {
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

  // testRootStore.componentService.add(dto)

  return dto
})
