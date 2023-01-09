import {
  APP_PAGE_NAME,
  APP_PAGE_SLUG,
  DEFAULT_GET_SERVER_SIDE_PROPS,
  INTERNAL_SERVER_ERROR_PAGE_NAME,
  INTERNAL_SERVER_ERROR_PAGE_SLUG,
  NOT_FOUND_PAGE_NAME,
  NOT_FOUND_PAGE_SLUG,
  ROOT_ELEMENT_NAME,
} from '@codelab/frontend/abstract/core'
import { createSlug } from '@codelab/frontend/shared/utils'
import { IPageKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const makeBasicPagesInput = (appId: string) => {
  const providerPageId = v4()
  const notFoundPageId = v4()
  const internalServerErrorPageId = v4()

  const providerPage = {
    id: providerPageId,
    name: APP_PAGE_NAME,
    slug: `${appId}-${APP_PAGE_SLUG}`,
    getServerSideProps: DEFAULT_GET_SERVER_SIDE_PROPS,
    app: {
      connect: { where: { node: { id: appId } } },
    },
    rootElement: {
      create: {
        node: {
          id: v4(),
          name: ROOT_ELEMENT_NAME,
          slug: createSlug(ROOT_ELEMENT_NAME, providerPageId),
        },
      },
    },
    kind: IPageKind.Provider,
  }

  const notFoundPage = {
    id: notFoundPageId,
    name: NOT_FOUND_PAGE_NAME,
    slug: `${appId}-${NOT_FOUND_PAGE_SLUG}`,
    app: {
      connect: { where: { node: { id: appId } } },
    },
    rootElement: {
      create: {
        node: {
          id: v4(),
          name: ROOT_ELEMENT_NAME,
          slug: createSlug(ROOT_ELEMENT_NAME, notFoundPageId),
        },
      },
    },
    kind: IPageKind.NotFound,
  }

  const internalServerErrorPage = {
    id: internalServerErrorPageId,
    name: INTERNAL_SERVER_ERROR_PAGE_NAME,
    slug: `${appId}-${INTERNAL_SERVER_ERROR_PAGE_SLUG}`,
    app: {
      connect: { where: { node: { id: appId } } },
    },
    rootElement: {
      create: {
        node: {
          id: v4(),
          name: ROOT_ELEMENT_NAME,
          slug: createSlug(ROOT_ELEMENT_NAME, internalServerErrorPageId),
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
