import type {
  ICreateElementData,
  IPage,
  IPageDto,
} from '@codelab/shared/abstract/core'
import type { APIRequestContext } from '@playwright/test'

import { IAtomType, IPageKind } from '@codelab/shared/abstract/core'
import { findOrFail } from '@codelab/shared/utils'
import { v4 } from 'uuid'

export const componentName = 'Container'

export const elementContainer = {
  atom: IAtomType.ReactFragment,
  id: v4(),
  name: componentName,
}

export const elementRowCreateData = {
  atom: IAtomType.AntDesignGridRow,
  id: v4(),
  name: 'Row',
  parentElement: elementContainer,
}

export const elementColCreateData = {
  atom: IAtomType.AntDesignGridCol,
  id: v4(),
  name: 'Column',
  parentElement: elementRowCreateData,
}

export const elementTextCreateData = {
  atom: IAtomType.AntDesignTypographyText,
  id: v4(),
  name: 'Text',
  parentElement: elementColCreateData,
}

export const providerPageElements = (
  page: IPageDto,
): Array<ICreateElementData> => [
  {
    ...elementContainer,
    parentElement: page.rootElement,
  },
  elementRowCreateData,
  elementColCreateData,
  elementTextCreateData,
]

export const seedTestData = async (request: APIRequestContext) => {
  const appResponse = await request.post('/api/v1/app/seed-cypress-app')
  const app = await appResponse.json()

  const page: IPage = findOrFail(
    app.pages,
    ({ kind }) => kind === IPageKind.Provider,
  )

  await request.post(`/api/v1/element/${page.rootElement.id}/create-elements`, {
    data: providerPageElements(page),
  })

  return app
}
