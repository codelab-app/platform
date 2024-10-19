import type {
  IAppCreateDto,
  IAppCreateFormData,
  IAppUpdateDto,
  IAppUpdateFormData,
  IMapper,
} from '@codelab/frontend/abstract/domain'
import type { IAppDto, IPageDto, IUserDto } from '@codelab/shared/abstract/core'
import type {
  AppCreateInput,
  AppDeleteInput,
  AppUpdateInput,
} from '@codelab/shared/infra/gql'

import { PageMapper } from '@codelab/frontend-domain-page/repositories'
import { PageDomainFactory } from '@codelab/frontend-domain-page/services'
import { AppProperties, connectOwner } from '@codelab/shared/domain-old'

export class AppMapper
  implements
    IMapper<IAppCreateDto, AppCreateInput, AppUpdateInput, AppDeleteInput>
{
  constructor(private owner: IUserDto) {
    this.pageFactory = new PageDomainFactory(this.owner)
    this.pageMapper = new PageMapper(this.owner)
  }

  toCreateInput({ id, name, pages }: IAppCreateDto): AppCreateInput {
    return {
      compositeKey: AppProperties.appCompositeKey({ name }, this.owner),
      id,
      owner: connectOwner(this.owner),
      pages: {
        create: pages.map((page) => ({
          node: this.pageMapper.toCreateInput(page),
        })),
      },
    }
  }

  toDeleteInput() {
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
  }

  toUpdateInput(dto: IAppUpdateDto): AppUpdateInput {
    return {
      compositeKey: AppProperties.appCompositeKey(dto, this.owner),
    }
  }

  private pageFactory

  private pageMapper
}
