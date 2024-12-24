import type { INodeType, IPageDto } from '@codelab/shared/abstract/core'
import type { Page, PageOptions, PageWhere } from '@codelab/shared/infra/gql'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import { PageFragment } from '@codelab/shared/infra/gql'
import { pageApi, pageMapper } from '@codelab/shared-domain-module/page'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PageRepository extends AbstractRepository<
  INodeType.Page,
  IPageDto,
  PageFragment,
  PageWhere,
  PageOptions
> {
  constructor(
    protected override validationService: ValidationService,
    protected override loggerService: PinoLoggerService,
  ) {
    super(validationService, loggerService)
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _addMany(pages: Array<IPageDto>) {
    const {
      createPages: { pages: createdPages },
    } = await pageApi().CreatePages({
      input: pages.map((page) => pageMapper.toCreateInput(page)),
    })

    return createdPages
  }

  protected async _find({
    options,
    where,
  }: {
    where?: PageWhere
    options?: PageOptions
  }) {
    const { items } = await pageApi().PageList({
      options,
      where,
    })

    return items
  }

  protected async _update(page: IPageDto, where: PageWhere) {
    const {
      updatePages: { pages },
    } = await pageApi().UpdatePages({
      update: pageMapper.toUpdateInput(page),
      where,
    })

    return pages[0]
  }
}
