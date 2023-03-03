import {
  APP_PAGE_NAME,
  DEFAULT_GET_SERVER_SIDE_PROPS,
  INTERNAL_SERVER_ERROR_PAGE_NAME,
  NOT_FOUND_PAGE_NAME,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { IPageKind } from '@codelab/shared/abstract/core'
import { connectNodeId } from '@codelab/shared/domain/mapper'
import { createUniqueName } from '@codelab/shared/utils'
import { v4 } from 'uuid'

export const makeBasicPagesInput = (appId: string) => {
  const providerPageId = v4()
  const notFoundPageId = v4()
  const internalServerErrorPageId = v4()
  const providerRootId = v4()

  const providerPage = {
    app: {
      connect: { where: { node: { id: appId } } },
    },
    getServerSideProps: DEFAULT_GET_SERVER_SIDE_PROPS,
    id: providerPageId,
    kind: IPageKind.Provider,
    name: createUniqueName(APP_PAGE_NAME, appId),
    pageContainerElement: connectNodeId(providerRootId),
    rootElement: {
      create: {
        node: {
          id: providerRootId,
          name: createUniqueName(ROOT_ELEMENT_NAME, providerPageId),
        },
      },
    },
  }

  const notFoundPage = {
    app: {
      connect: { where: { node: { id: appId } } },
    },
    id: notFoundPageId,
    kind: IPageKind.NotFound,
    name: createUniqueName(NOT_FOUND_PAGE_NAME, appId),
    rootElement: {
      create: {
        node: {
          id: v4(),
          name: createUniqueName(ROOT_ELEMENT_NAME, notFoundPageId),
        },
      },
    },
  }

  const internalServerErrorPage = {
    app: {
      connect: { where: { node: { id: appId } } },
    },
    id: internalServerErrorPageId,
    kind: IPageKind.InternalServerError,
    name: createUniqueName(INTERNAL_SERVER_ERROR_PAGE_NAME, appId),
    rootElement: {
      create: {
        node: {
          id: v4(),
          name: createUniqueName(ROOT_ELEMENT_NAME, internalServerErrorPageId),
        },
      },
    },
  }

  return {
    create: [
      { node: providerPage },
      { node: notFoundPage },
      { node: internalServerErrorPage },
    ],
  }
}
