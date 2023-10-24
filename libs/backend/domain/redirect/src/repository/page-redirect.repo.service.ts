import type {
  PageRedirect,
  PageRedirectOptions,
  PageRedirectWhere,
} from '@codelab/backend/abstract/codegen'
import {
  OgmService,
  redirectSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IPageRedirectDTO } from '@codelab/shared/abstract/core'
import { IRedirectKind } from '@codelab/shared/abstract/core'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PageRedirectRepository extends AbstractRepository<
  IPageRedirectDTO,
  PageRedirect,
  PageRedirectWhere,
  PageRedirectOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
  ) {
    super(traceService, validationService)
  }

  protected async _add(redirects: Array<IPageRedirectDTO>) {
    return (
      await (
        await this.ogmService.PageRedirect
      ).create({
        input: redirects.map(({ id, page }) => ({
          id,
          kind: IRedirectKind.PageRedirect,
          page: connectNodeId(page.id),
        })),
      })
    ).pageRedirects
  }

  protected async _find({
    options,
    where,
  }: {
    where?: PageRedirectWhere
    options?: PageRedirectOptions
  }) {
    return await (
      await this.ogmService.PageRedirect
    ).find({
      options,
      selectionSet: redirectSelectionSet,
      where,
    })
  }

  protected async _update(
    { page }: IPageRedirectDTO,
    where: PageRedirectWhere,
  ) {
    return (
      await (
        await this.ogmService.PageRedirect
      ).update({
        update: {
          page: reconnectNodeId(page.id),
        },
        where,
      })
    ).pageRedirects[0]
  }
}
