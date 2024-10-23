import type {
  IAppDto,
  ICreateComponentData,
  ICreateElementData,
  ICreatePageData,
  IRef,
} from '@codelab/shared/abstract/core'
import type { APIRequestContext } from '@playwright/test'

import { IAtomType, IPageKind } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { v4 } from 'uuid'

import { seedAppData } from '../builder/builder.data'

export const componentName = 'Component Name'
export const spaceElementName = 'Space Item'
export const typographyElementName = 'Typography Item'
export const spaceElementId = v4()
export const componentId = v4()
export const pageId = v4()

export const spaceElement = (rootElement: IRef): ICreateElementData => ({
  atom: IAtomType.AntDesignSpace,
  id: spaceElementId,
  name: spaceElementName,
  parentElement: { id: rootElement.id },
})

export const typographyElement = {
  atom: IAtomType.AntDesignTypographyText,
  id: v4(),
  name: typographyElementName,
  parentElement: { id: spaceElementId },
}

export const regularPageCreateData = (app: IAppDto): ICreatePageData => ({
  app,
  id: pageId,
  kind: IPageKind.Regular,
  name: 'Test Page',
  urlPattern: '/test-page',
})

export const componentData: ICreateComponentData = {
  id: componentId,
  name: componentName,
}

export const builderElements = [
  {
    atom: componentName,
    name: componentName,
    parentElement: ROOT_ELEMENT_NAME,
  },
]

export const seedTestData = async (request: APIRequestContext) => {
  const app = await seedAppData(request)

  await request.post('/api/v1/page/create-page', {
    data: regularPageCreateData(app),
  })

  const componentResponse = await request.post(
    '/api/v1/component/create-component',
    { data: componentData },
  )

  const component = await componentResponse.json()

  await request.post(
    `/api/v1/element/${component.rootElement.id}/create-elements`,
    { data: [spaceElement(component.rootElement), typographyElement] },
  )

  return app
}
