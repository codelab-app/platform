import { AbstractRepository } from '@codelab/backend/abstract/types'
import {
  componentSelectionSet,
  pageSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import type { IPageDTO } from '@codelab/frontend/abstract/core'
import type { OGM_TYPES } from '@codelab/shared/abstract/codegen'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
import { createUniqueName, uuidRegex } from '@codelab/shared/utils'
import flatMap from 'lodash/flatMap'
import flatten from 'lodash/flatten'

export class PageRepository extends AbstractRepository<
  IPageDTO,
  OGM_TYPES.Page,
  OGM_TYPES.PageWhere
> {
  private Page = Repository.instance.Page

  async find(where: OGM_TYPES.PageWhere = {}) {
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
          }) => ({
            _compoundName: createUniqueName(name, app.id),
            app: connectNodeId(app.id),
            id,
            kind,
            pageContentContainer: connectNodeId(pageContentContainer?.id),
            rootElement: connectNodeId(rootElement.id),
            store: connectNodeId(store.id),
          }),
        ),
      })
    ).pages
  }

  protected async _update(
    { app, id, kind, name, pageContentContainer, rootElement }: IPageDTO,
    where: OGM_TYPES.PageWhere,
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
        },
        where,
      })
    ).pages[0]
  }
}

export const getPageData = async (page: OGM_TYPES.Page) => {
  const Component = await Repository.instance.Component
  const elements = [page.rootElement, ...page.rootElement.descendantElements]

  const componentIds = flatMap(elements, (element) => [
    element.parentComponent?.id,
    element.renderComponentType?.id,
    ...(element.props.data.match(uuidRegex) || []),
  ]).filter((element): element is string => Boolean(element))

  const components = await Component.find({
    selectionSet: componentSelectionSet,
    where: { id_IN: componentIds },
  })

  const componentElements = components.map((component) => [
    component.rootElement,
    ...component.rootElement.descendantElements,
  ])

  return {
    components,
    elements: [...elements, ...flatten(componentElements)],
  }
}
