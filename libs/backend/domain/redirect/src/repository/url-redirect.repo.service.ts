import type {
  UrlRedirect,
  UrlRedirectOptions,
  UrlRedirectWhere,
} from '@codelab/backend/abstract/codegen'
import {
  OgmService,
  redirectSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IUrlRedirectDTO } from '@codelab/shared/abstract/core'
import { IRedirectKind } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UrlRedirectRepository extends AbstractRepository<
  IUrlRedirectDTO,
  UrlRedirect,
  UrlRedirectWhere,
  UrlRedirectOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
  ) {
    super(traceService, validationService)
  }

  protected async _add(redirects: Array<IUrlRedirectDTO>) {
    return (
      await (
        await this.ogmService.UrlRedirect
      ).create({
        input: redirects.map(({ id, url }) => ({
          id,
          kind: IRedirectKind.UrlRedirect,
          url,
        })),
      })
    ).urlRedirects
  }

  protected async _find({
    options,
    where,
  }: {
    where?: UrlRedirectWhere
    options?: UrlRedirectOptions
  }) {
    return await (
      await this.ogmService.UrlRedirect
    ).find({
      options,
      selectionSet: redirectSelectionSet,
      where,
    })
  }

  protected async _update({ url }: IUrlRedirectDTO, where: UrlRedirectWhere) {
    return (
      await (
        await this.ogmService.UrlRedirect
      ).update({
        update: { url },
        where,
      })
    ).urlRedirects[0]
  }
}
