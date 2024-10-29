import type {
  IAppDto,
  IMapper,
  IPageDto,
  IUserDto,
} from '@codelab/shared/abstract/core'
import type {
  AppCreateInput,
  AppDeleteInput,
  AppUpdateInput,
} from '@codelab/shared/infra/gql'

import { connectNodeIds, connectOwner, reconnectNodeIds } from '../orm'
import { AppProperties } from './app.properties'

export const appMapper: IMapper<
  IAppDto,
  AppCreateInput,
  AppUpdateInput,
  AppDeleteInput
> = {
  toCreateInput: ({ id, name, owner, pages }: IAppDto): AppCreateInput => {
    return {
      compositeKey: AppProperties.appCompositeKey({ name }, owner),
      id,
      owner: connectOwner(owner),
      pages: connectNodeIds(pages?.map((page) => page.id)),
    }
  },

  toDeleteInput: () => {
    return {
      domains: [
        {
          // delete: Domain.toDeleteInput(),
          where: {},
        },
      ],
      pages: [
        {
          // delete: Page.toDeleteInput(),
          where: {},
        },
      ],
    }
  },

  toUpdateInput: ({ name, owner, pages }: IAppDto): AppUpdateInput => {
    const compositeKey = AppProperties.appCompositeKey({ name }, owner)

    if (!pages) {
      return { compositeKey }
    }

    return {
      compositeKey,
      pages: reconnectNodeIds(pages.map((page) => page.id)).map(
        (input) => input,
      ),
    }
  },
}
