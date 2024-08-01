import { type IPageDto, IPageKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const pageDto: IPageDto = {
  app: { id: v4() },
  id: v4(),
  kind: IPageKind.Regular,
  name: 'Test Page',
  rootElement: {
    id: v4(),
  },
  store: { id: v4() },
  urlPattern: '',
}
