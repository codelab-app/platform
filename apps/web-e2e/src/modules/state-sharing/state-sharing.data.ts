import type {
  IAppDto,
  IComponent,
  ICreateComponentData,
  ICreateElementData,
  IPageCreateFormData,
  IRef,
  IUserDto,
} from '@codelab/shared-abstract-core'
import type { APIRequestContext } from '@playwright/test'

import { IAtomType, IPageKind } from '@codelab/shared-abstract-core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config/env'
import { v4 } from 'uuid'

import { requestOrThrow } from '../../api'
import { seedAppData } from '../app/app.data'

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
  const app = await seedAppData(request, {
    atomTypes: [IAtomType.AntDesignSpace, IAtomType.AntDesignTypographyText],
    componentTypes: [],
  })

  const owner = await requestOrThrow<IUserDto>(request, 'user/me', {
    method: 'GET',
  })

  await requestOrThrow(request, 'page/create', {
    data: regularPageCreateData(app),
    method: 'POST',
  })

  const component = await requestOrThrow<IComponent>(
    request,
    'component/create-component',
    {
      data: componentData(owner),
      method: 'POST',
    },
  )

  await requestOrThrow(
    request,
    `element/${component.rootElement.id}/create-elements`,
    {
      data: [spaceElement(component.rootElement), typographyElement],
      method: 'POST',
    },
  )

  return app
}
