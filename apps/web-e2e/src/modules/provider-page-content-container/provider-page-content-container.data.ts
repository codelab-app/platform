import type {
  IAppDto,
  ICreateElementData,
  IPage,
  IPageCreateFormData,
  IPageDto,
} from '@codelab/shared-abstract-core'
import type { APIRequestContext } from '@playwright/test'

import { IAtomType, IPageKind } from '@codelab/shared-abstract-core'
import { findOrFail } from '@codelab/shared/utils'
import { v4 } from 'uuid'

import { requestOrThrow } from '../../api'
import { seedAppData } from '../app/app.data'

export const regularPageId = v4()
export const pageName = 'Test Page'
export const pageContentContainerName = 'Provider Card'

export const providerPageCardElementCreateData = (
  page: IPageDto,
): ICreateElementData => ({
  atom: IAtomType.AntDesignCard,
  id: v4(),
  name: pageContentContainerName,
  parentElement: page.rootElement,
})

export const regularPageInputElementCreateData = (
  page: IPageDto,
): ICreateElementData => ({
  atom: IAtomType.AntDesignInput,
  id: v4(),
  name: 'Input',
  parentElement: page.rootElement,
})

export const regularPageCreateData = (app: IAppDto): IPageCreateFormData => ({
  app,
  id: regularPageId,
  kind: IPageKind.Regular,
  name: pageName,
  urlPattern: '/test-page',
})

export const seedTestData = async (request: APIRequestContext) => {
  const app = await seedAppData(request, {
    atomTypes: [IAtomType.AntDesignCard, IAtomType.AntDesignInput],
    componentTypes: [],
  })

  /**
   * Provider page
   */
  const page: IPage = findOrFail(
    app.pages,
    ({ kind }) => kind === IPageKind.Provider,
  )

  await requestOrThrow(
    request,
    `element/${page.rootElement.id}/create-elements`,
    {
      data: [providerPageCardElementCreateData(page)],
      method: 'POST',
    },
  )

  const regularPage = await requestOrThrow<IPage>(request, 'page/create', {
    data: regularPageCreateData(app),
    method: 'POST',
  })

  await requestOrThrow(
    request,
    `element/${regularPage.rootElement.id}/create-elements`,
    {
      data: [regularPageInputElementCreateData(regularPage)],
      method: 'POST',
    },
  )

  return app
}
