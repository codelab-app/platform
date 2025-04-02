import type { IPage } from '@codelab/shared/abstract/core'

import { IPageKind } from '@codelab/shared/abstract/core'
import { E2E_ATOM_TYPES } from '@codelab/shared/data/test'
import { type APIRequestContext } from '@playwright/test'
import { v4 } from 'uuid'

import { requestOrThrow } from '../../api'
import { REQUEST_TIMEOUT } from '../../setup/config'
import { seedAppData } from '../app/app.data'

export const PAGE_COUNT = 5

const createPageWithAllPossibleAtoms = async (
  appId: string,
  pageName: string,
  request: APIRequestContext,
) => {
  const page = await requestOrThrow<IPage>(request, 'page/create', {
    data: {
      app: { id: appId },
      id: v4(),
      kind: IPageKind.Regular,
      name: pageName,
      urlPattern: `/${pageName}`,
    },
    method: 'POST',
    timeout: REQUEST_TIMEOUT,
  })

  const elements = E2E_ATOM_TYPES.map((atom) => ({
    atom,
    id: v4(),
    name: atom,
  }))

  const [firstChild, ...restChildren] = elements

  await requestOrThrow(request, `element/${page.id}/create-elements`, {
    data: [
      { ...firstChild, parentElement: { id: page.rootElement.id } },
      ...restChildren.map((child, index) => ({
        ...child,
        prevSibling: { id: elements[index]!.id },
      })),
    ],
    method: 'POST',
    timeout: REQUEST_TIMEOUT,
  })
}

export const seedTestData = async (request: APIRequestContext) => {
  const app = await seedAppData(request, {
    atomTypes: E2E_ATOM_TYPES,
    componentTypes: [],
  })

  for (let i = 0; i < PAGE_COUNT; i++) {
    await createPageWithAllPossibleAtoms(app.id, `Page ${i}`, request)
  }

  return app
}
