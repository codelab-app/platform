import type { IMapper } from '@codelab/frontend/abstract/domain'
import type {
  ICreateElementData,
  IElementDto,
  IPageCreateDto,
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

import { ElementMapper } from '@codelab/frontend-domain-element/repositories'
import { StoreMapper } from '@codelab/frontend-domain-store/repositories'
import { connectNodeId, PageProperties } from '@codelab/shared/domain-old'

export class PageMapper
  implements
    IMapper<IPageCreateDto, PageCreateInput, PageUpdateInput, PageDeleteInput>
{
  constructor(private owner: IUserDto) {
    this.elementMapper = new ElementMapper()
    this.storeMapper = new StoreMapper()
  }

  toCreateInput({
    app,
    id,
    kind,
    name,
    pageContentContainer,
    rootElement,
    store,
    urlPattern,
  }: IPageCreateDto): PageCreateInput {
    return {
      app: connectNodeId(app.id),
      compositeKey: PageProperties.pageCompositeKey({ name }, app),
      id,
      kind,
      pageContentContainer: connectNodeId(pageContentContainer?.id),
      rootElement: {
        create: {
          node: this.elementMapper.toCreateInput(rootElement),
        },
      },
      store: {
        create: {
          node: this.storeMapper.toCreateInput(store),
        },
      },
      urlPattern,
    }
  }

  toDeleteInput() {
    return {}
  }

  toUpdateInput() {
    return {}
  }

  private elementMapper

  private storeMapper
}
