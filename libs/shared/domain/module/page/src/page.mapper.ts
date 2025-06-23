import type { IMapper, IPageDto } from '@codelab/shared-abstract-core'
import type {
  PageCreateInput,
  PageDeleteInput,
  PageUpdateInput,
} from '@codelab/shared-infra-gqlgen'

import { storeMapper } from '@codelab/shared-domain-module-store'
import { connectNodeId, reconnectNodeId } from '@codelab/shared-domain-orm'

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
      redirect: { delete: {} },
      // pageContentContainer: { delete: {}, where: {} },
      rootElement: {
        delete: {
          props: {},
        },
      },
      store: {
        delete: storeMapper.toDeleteInput(),
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
