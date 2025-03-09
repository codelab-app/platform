import { IPageKind } from '@codelab/shared/abstract/core'
import { atomTypes } from '@codelab/shared/data/test'
import { type APIRequestContext } from '@playwright/test'
import { v4 } from 'uuid'

import { seedAppData } from '../builder/builder.data'

export const PAGE_COUNT = 5

const createPageWithAllPossibleAtoms = async (
  appId: string,
  pageName: string,
  request: APIRequestContext,
) => {
  const pageResponse = await request.post('/api/v1/page/create', {
    data: {
      app: { id: appId },
      id: v4(),
      kind: IPageKind.Regular,
      name: pageName,
      urlPattern: `/${pageName}`,
    },
  })

  const page = await pageResponse.json()
  const elements = atomTypes.map((atom) => ({ atom, id: v4(), name: atom }))
  const [firstChild, ...restChildren] = elements

  await request.post(`/api/v1/element/${page.id}/create-elements`, {
    data: [
      { ...firstChild, parentElement: { id: page.rootElement.id } },
      ...restChildren.map((child, index) => ({
        ...child,
        prevSibling: { id: elements[index]!.id },
      })),
    ],
  })
}

export const seedTestData = async (request: APIRequestContext) => {
  const app = await seedAppData(request)

  for (let i = 0; i < PAGE_COUNT; i++) {
    await createPageWithAllPossibleAtoms(app.id, `Page ${i}`, request)
  }

  return app
}
