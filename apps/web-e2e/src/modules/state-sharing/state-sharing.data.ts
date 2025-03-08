import type {
  IAppDto,
  ICreateComponentData,
  ICreateElementData,
  IPageCreateFormData,
  IRef,
} from '@codelab/shared/abstract/core'
import type { APIRequestContext } from '@playwright/test'

import { IAtomType, IPageKind } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config/env'
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

export const regularPageCreateData = (app: IAppDto): IPageCreateFormData => ({
  app,
  id: pageId,
  kind: IPageKind.Regular,
  name: 'Test Page',
  urlPattern: '/test-page',
})

export const componentData = (owner: IRef): ICreateComponentData => ({
  id: componentId,
  name: componentName,
  owner,
})

export const builderElements = [
  {
    atom: componentName,
    name: componentName,
    parentElement: ROOT_ELEMENT_NAME,
  },
]

export const seedTestData = async (request: APIRequestContext) => {
  const app = await seedAppData(request)
  const ownerResponse = await request.get('/api/v1/user/me')
  const owner = await ownerResponse.json()

  await request.post('/api/v1/page/create', {
    data: regularPageCreateData(app),
  })

  const componentResponse = await request.post(
    '/api/v1/component/create-component',
    { data: componentData(owner) },
  )

  const component = await componentResponse.json()

  console.log('component', component)

  await request.post(
    `/api/v1/element/${component.rootElement.id}/create-elements`,
    { data: [spaceElement(component.rootElement), typographyElement] },
  )

  return app
}
