import type { IAppDto, IMapper } from '@codelab/shared-abstract-core'
import type {
  AppCreateInput,
  AppDeleteInput,
  AppUpdateInput,
} from '@codelab/shared-infra-gqlgen'

import { domainMapper } from '@codelab/shared-domain-module-domain'
import { pageMapper } from '@codelab/shared-domain-module-page'
import {
  connectNodeIds,
  connectOwner,
  reconnectNodeIds,
} from '@codelab/shared-domain-orm'

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
          delete: domainMapper.toDeleteInput(),
        },
      ],
      pages: [
        {
          delete: pageMapper.toDeleteInput(),
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
