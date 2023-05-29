import type { Page, PageWhere } from '@codelab/backend/abstract/codegen'
import { getElementWithDescendants } from '@codelab/backend/domain/element'
import {
  exportComponentSelectionSet,
  pageSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { AbstractRepository } from '@codelab/backend/infra/core'
import type { IPageDTO } from '@codelab/shared/abstract/core'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
import { createUniqueName, uuidRegex } from '@codelab/shared/utils'
import flatMap from 'lodash/flatMap'

export class PageRepository extends AbstractRepository<
  IPageDTO,
  Page,
  PageWhere
> {
  private Page = Repository.instance.Page

  async _find(where: PageWhere = {}) {
    return await (
      await this.Page
    ).find({
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
        await this.Page
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
        await this.Page
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

export const getPageData = async (page: Page) => {
  const Component = await Repository.instance.Component
  const elements = await getElementWithDescendants(page.rootElement.id)

  const componentIds = flatMap(elements, (element) => [
    element.parentComponent?.id,
    element.renderComponentType?.id,
    ...(element.props.data.match(uuidRegex) || []),
  ]).filter((element): element is string => Boolean(element))

  const components = await Component.find({
    selectionSet: exportComponentSelectionSet,
    where: { id_IN: componentIds },
  })

  for (const { rootElement } of components) {
    const componentDescendants = await getElementWithDescendants(rootElement.id)

    elements.push(...componentDescendants)
  }

  return { components, elements }
}
