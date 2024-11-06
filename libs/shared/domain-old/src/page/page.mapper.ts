import type {
  ICreateElementData,
  IElementDto,
  IMapper,
  IPageCreateFormData,
  IPageDto,
  IRef,
  IStoreDto,
  IUserDto,
} from '@codelab/shared/abstract/core'
import type {
  PageCreateInput,
  PageDeleteInput,
  PageUpdateInput,
} from '@codelab/shared/infra/gql'

import { connectNodeId, reconnectNodeId } from '../orm'
import { storeMapper } from '../store'
import { PageProperties } from './page.properties'

export const pageMapper: IMapper<
  IPageDto,
  PageCreateInput,
  PageUpdateInput,
  PageDeleteInput
> = {
  toCreateInput: ({
    app,
    id,
    kind,
    name,
    pageContentContainer,
    rootElement,
    store,
    urlPattern,
  }: IPageDto): PageCreateInput => {
    return {
      app: connectNodeId(app.id),
      compositeKey: PageProperties.pageCompositeKey({ name }, app),
      id,
      kind,
      pageContentContainer: connectNodeId(pageContentContainer?.id),
      rootElement: connectNodeId(rootElement.id),
      store: connectNodeId(store.id),
      urlPattern,
    }
  },

  toDeleteInput: (): PageDeleteInput => {
    return {
      redirect: { where: {} },
      // pageContentContainer: { delete: {}, where: {} },
      rootElement: {},
      store: {
        delete: storeMapper.toDeleteInput(),
        where: {},
      },
    }
  },

  toUpdateInput: ({
    app,
    name,
    pageContentContainer,
    rootElement,
    urlPattern,
  }: IPageDto): PageUpdateInput => {
    return {
      app: reconnectNodeId(app.id),
      compositeKey: PageProperties.pageCompositeKey({ name }, app),
      pageContentContainer: reconnectNodeId(pageContentContainer?.id),
      rootElement: reconnectNodeId(rootElement.id),
      urlPattern,
    }
  },
}
