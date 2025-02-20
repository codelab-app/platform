import type {
  IAppDto,
  ICreateElementData,
  IPage,
  IPageCreateFormData,
} from '@codelab/shared/abstract/core'

import { IAtomType, IPageKind, ITypeKind } from '@codelab/shared/abstract/core'
import { findOrFail } from '@codelab/shared/utils'
import { type APIRequestContext } from '@playwright/test'
import { v4 } from 'uuid'

import { REQUEST_TIMEOUT } from '../../setup/config'
import { seedAppData } from '../builder/builder.data'

export const testUrlProps = {
  subtestId: 'second-url-segment',
  testId: 'first-url-segment',
}

export const providerPageLinkElement: ICreateElementData = {
  atom: IAtomType.NextLink,
  id: v4(),
  name: 'Test Page Link',
  propsData: {
    children: {
      kind: ITypeKind.RichTextType,
      type: 'e7558508-3bb7-4f57-8f8c-6ac989911765',
      value: 'go to test page',
    },
    href: '/test-page',
  },
}
export const staticPageTextElement: ICreateElementData = {
  atom: IAtomType.AntDesignTypographyText,
  id: v4(),
  name: 'Test Page Content',
  propsData: {
    children: {
      kind: ITypeKind.RichTextType,
      type: 'e7558508-3bb7-4f57-8f8c-6ac989911765',
      value: 'this is the test page',
    },
  },
}
export const staticPageLinkElement: ICreateElementData = {
  atom: IAtomType.NextLink,
  id: v4(),
  name: 'Dynamic Page Link',
  prevSibling: { id: staticPageTextElement.id },
  propsData: {
    children: {
      kind: ITypeKind.RichTextType,
      type: 'e7558508-3bb7-4f57-8f8c-6ac989911765',
      value: 'go to dynamic page',
    },
    href: `/tests/${testUrlProps.testId}/subtests/${testUrlProps.subtestId}`,
  },
}
export const dynamicPageTextElement: ICreateElementData = {
  atom: IAtomType.AntDesignTypographyText,
  id: v4(),
  name: 'Dynamic Page Content',
  propsData: {
    children: {
      kind: ITypeKind.RichTextType,
      type: 'e7558508-3bb7-4f57-8f8c-6ac989911765',
      value:
        'testId: "{{urlProps.testId}}", subtestId: "{{urlProps.subtestId}}"',
    },
  },
}

export const buildTestPages = (app: IAppDto) => {
  const staticPage: IPageCreateFormData = {
    app,
    id: v4(),
    kind: IPageKind.Regular,
    name: 'Test Page',
    urlPattern: '/test-page',
  }

  const dynamicPage: IPageCreateFormData = {
    app,
    id: v4(),
    kind: IPageKind.Regular,
    name: 'Dynamic Page',
    urlPattern: '/tests/:testId/subtests/:subtestId',
  }

  return {
    dynamicPage,
    staticPage,
  }
}

export const seedTestData = async (request: APIRequestContext) => {
  const app = await seedAppData(request)
  const pages = buildTestPages(app)

  const page: IPage = findOrFail(
    app.pages,
    ({ kind }) => kind === IPageKind.Provider,
  )

  const response = await request.post(
    `/api/v1/element/${page.rootElement.id}/create-elements`,
    {
      data: [{ ...providerPageLinkElement, parentElement: page.rootElement }],
      timeout: REQUEST_TIMEOUT,
    },
  )

  const pageResponse = await request.post('/api/v1/page/create', {
    data: pages.staticPage,
  })

  const staticPage = await pageResponse.json()

  await request.post(`/api/v1/element/${staticPage.id}/create-elements`, {
    data: [
      {
        ...staticPageTextElement,
        parentElement: { id: staticPage.rootElement.id },
      },
      staticPageLinkElement,
    ],
  })

  const dynamicPageResponse = await request.post('/api/v1/page/create', {
    data: pages.dynamicPage,
  })

  const dynamicPage = await dynamicPageResponse.json()

  await request.post(`/api/v1/element/${dynamicPage.id}/create-elements`, {
    data: [
      {
        ...dynamicPageTextElement,
        parentElement: { id: dynamicPage.rootElement.id },
      },
    ],
  })

  return app
}
