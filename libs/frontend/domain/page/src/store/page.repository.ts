import type { IPage, IPageRepository } from '@codelab/frontend/abstract/core'
import type { AppWhere } from '@codelab/shared/abstract/codegen'
import { IPageKind } from '@codelab/shared/abstract/core'
import { connectNodeId, reconnectNodeId } from '@codelab/shared/domain/mapper'
import { createUniqueName } from '@codelab/shared/utils'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { pageApi } from './page.api'

@model('@codelab/PageRepository')
export class PageRepository extends Model({}) implements IPageRepository {
  @modelFlow
  add = _async(function* (
    this: PageRepository,
    { id, name, app, rootElement, getServerSideProps }: IPage,
  ) {
    const {
      createPages: { pages },
    } = yield* _await(
      pageApi.CreatePages({
        input: {
          _compoundName: createUniqueName(name, app),
          app: connectNodeId(app.id),
          getServerSideProps,
          id,
          kind: IPageKind.Regular,
          rootElement: {
            create: {
              node: rootElement.current.toCreateInput(),
            },
          },
        },
      }),
    )

    return pages[0]!
  })

  @modelFlow
  update = _async(function* (
    this: PageRepository,
    { name, id, app, getServerSideProps, pageContentContainer }: IPage,
  ) {
    const {
      updatePages: { pages },
    } = yield* _await(
      pageApi.UpdatePages({
        update: {
          _compoundName: createUniqueName(name, app),
          app: connectNodeId(app.id),
          getServerSideProps,
          pageContentContainer: reconnectNodeId(pageContentContainer?.id),
        },
        where: { id },
      }),
    )

    return pages[0]!
  })

  @modelFlow
  find = _async(function* (this: PageRepository, where: AppWhere) {
    const { pages } = yield* _await(pageApi.GetPages({ where }))

    return pages
  })

  @modelFlow
  delete = _async(function* (this: PageRepository, pages: Array<IPage>) {
    const {
      deletePages: { nodesDeleted },
    } = yield* _await(
      pageApi.DeletePages({
        delete: {
          pageContentContainer: { delete: {}, where: {} },
          rootElement: {},
        },
        where: { id_IN: pages.map((page) => page.id) },
      }),
    )

    return nodesDeleted
  })
}
