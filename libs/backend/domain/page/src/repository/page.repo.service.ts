import type {
  Page,
  PageOptions,
  PageWhere,
} from '@codelab/backend/abstract/codegen'
import {
  OgmService,
  pageSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { ValidationService } from '@codelab/backend/infra/adapter/typebox'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IPageDto } from '@codelab/shared/abstract/core'
import {
  connectNodeId,
  PageProperties,
  reconnectNodeId,
} from '@codelab/shared/domain/mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PageRepository extends AbstractRepository<
  IPageDto,
  Page,
  PageWhere,
  PageOptions
> {
  constructor(
    private ogmService: OgmService,
    protected traceService: TraceService,
    protected validationService: ValidationService,
  ) {
    super(traceService, validationService)
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _addMany(pages: Array<IPageDto>) {
    return (
      await (
        await this.ogmService.Page
      ).create({
        input: pages.map(
          ({
            app,
            id,
            kind,
            name,
            pageContentContainer,
            rootElement,
            store,
            url,
          }) => ({
            app: connectNodeId(app.id),
            compositeKey: PageProperties.pageCompositeKey(name, app),
            id,
            kind,
            pageContentContainer: connectNodeId(pageContentContainer?.id),
            rootElement: connectNodeId(rootElement.id),
            store: connectNodeId(store.id),
            url,
          }),
        ),
      })
    ).pages
  }

  protected async _find({
    options,
    where,
  }: {
    where?: PageWhere
    options?: PageOptions
  }) {
    return await (
      await this.ogmService.Page
    ).find({
      options,
      selectionSet: `{ ${pageSelectionSet} }`,
      where,
    })
  }

  protected async _update(
    { app, name, pageContentContainer, rootElement, url }: IPageDto,
    where: PageWhere,
  ) {
    return (
      await (
        await this.ogmService.Page
      ).update({
        update: {
          app: reconnectNodeId(app.id),
          compositeKey: PageProperties.pageCompositeKey(name, app),
          pageContentContainer: reconnectNodeId(pageContentContainer?.id),
          rootElement: reconnectNodeId(rootElement.id),
          url,
        },
        where,
      })
    ).pages[0]
  }
}
