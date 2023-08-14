import type {
  Page,
  PageOptions,
  PageWhere,
} from '@codelab/backend/abstract/codegen'
import {
  OGMService,
  pageSelectionSet,
} from '@codelab/backend/infra/adapter/neo4j'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IPageDTO } from '@codelab/shared/abstract/core'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
import { createUniqueName } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PageRepository extends AbstractRepository<
  IPageDTO,
  Page,
  PageWhere,
  PageOptions
> {
  constructor(
    private ogmService: OGMService,
    protected traceService: TraceService,
  ) {
    super(traceService)
  }

  async _find({
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
      selectionSet: pageSelectionSet,
      where,
    })
  }

  /**
   * We only deal with connecting/disconnecting relationships, actual items should exist already
   */
  protected async _add(pages: Array<IPageDTO>) {
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
            _compoundName: createUniqueName(name, app.id),
            app: connectNodeId(app.id),
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

  protected async _update(
    { app, name, pageContentContainer, rootElement, url }: IPageDTO,
    where: PageWhere,
  ) {
    return (
      await (
        await this.ogmService.Page
      ).update({
        update: {
          _compoundName: createUniqueName(name, app.id),
          app: reconnectNodeId(app.id),
          pageContentContainer: reconnectNodeId(pageContentContainer?.id),
          rootElement: reconnectNodeId(rootElement.id),
          url,
        },
        where,
      })
    ).pages[0]
  }
}
