import {
  APP_PAGE_NAME,
  DEFAULT_GET_SERVER_SIDE_PROPS,
  INTERNAL_SERVER_ERROR_PAGE_NAME,
  NOT_FOUND_PAGE_NAME,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { createUniqueName } from '@codelab/frontend/shared/utils'
import { IPageKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const makeBasicPagesInput = (appId: string) => {
  const providerPageId = v4()
  const notFoundPageId = v4()
  const internalServerErrorPageId = v4()

  const providerPage = {
    id: providerPageId,
    name: createUniqueName(APP_PAGE_NAME, appId),
    getServerSideProps: DEFAULT_GET_SERVER_SIDE_PROPS,
    app: {
      connect: { where: { node: { id: appId } } },
    },
    rootElement: {
      create: {
        node: {
          id: v4(),
          name: createUniqueName(ROOT_ELEMENT_NAME, providerPageId),
        },
      },
    },
    kind: IPageKind.Provider,
  }

  const notFoundPage = {
    id: notFoundPageId,
    name: createUniqueName(NOT_FOUND_PAGE_NAME, appId),
    app: {
      connect: { where: { node: { id: appId } } },
    },
    rootElement: {
      create: {
        node: {
          id: v4(),
          name: createUniqueName(ROOT_ELEMENT_NAME, notFoundPageId),
        },
      },
    },
    kind: IPageKind.NotFound,
  }

  const internalServerErrorPage = {
    id: internalServerErrorPageId,
    name: createUniqueName(INTERNAL_SERVER_ERROR_PAGE_NAME, appId),
    app: {
      connect: { where: { node: { id: appId } } },
    },
    rootElement: {
      create: {
        node: {
          id: v4(),
          name: createUniqueName(ROOT_ELEMENT_NAME, internalServerErrorPageId),
        },
      },
    },
    kind: IPageKind.InternalServerError,
  }

  return {
    create: [
      { node: providerPage },
      { node: notFoundPage },
      { node: internalServerErrorPage },
    ],
  }
}
