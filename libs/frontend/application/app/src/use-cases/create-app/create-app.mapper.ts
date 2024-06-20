import type { ICreateAppData } from '@codelab/frontend/abstract/domain'
import type {
  AppCreateInput,
  AppDeleteInput,
  AppUpdateInput,
} from '@codelab/shared/abstract/codegen'
import type { IOwner, IRef } from '@codelab/shared/abstract/core'
import { AppProperties, connectOwner } from '@codelab/shared/domain'

interface CreateAppMapper {
  (appDto: ICreateAppData): AppCreateInput
}

export const createAppMapper = ({ id, name }: ICreateAppData, owner: IRef) => {
  return {
    compositeKey: AppProperties.appCompositeKey(name, owner),
    id,
    owner: connectOwner(owner),
    pages: {
      create: pages.map((page) => ({
        node: page.toCreateInput(),
      })),
    },
  }
}
