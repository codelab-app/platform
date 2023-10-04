import type { IPageDTO } from '@codelab/shared/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import { Factory } from 'fishery'
import { v4 } from 'uuid'
import { rootStore as testRootStore } from '../setup'
import chance from './chance'

export default Factory.define<IPageDTO>(({ params }) => {
  const dto = {
    app: { id: params.app?.id ?? v4() },
    id: params.id ?? v4(),
    kind: params.kind ?? IPageKind.Regular,
    name: params.name ?? chance.word(),
    rootElement: { id: params.rootElement?.id ?? v4() },
    store: { id: params.store?.id ?? v4() },
    url: chance.word(),
  }

  testRootStore.pageService.add(dto)

  return dto
})