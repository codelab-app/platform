import type {
  IApp,
  ICreateComponentData,
  ICreateElementData,
  IPageDto,
} from '@codelab/shared/abstract/core'
import { IAtomType, ITypeKind } from '@codelab/shared/abstract/core'
import { type APIRequestContext } from '@playwright/test'
import { v4 } from 'uuid'

export const childMapperComponent: ICreateComponentData = {
  id: v4(),
  name: 'Component Name',
}

export const childMapperComponentTypography = {
  atom: IAtomType.AntDesignTypographyText,
  id: v4(),
  name: 'Text Content',
  propsData: {
    children: {
      kind: ITypeKind.RichTextType,
      type: 'e7558508-3bb7-4f57-8f8c-6ac989911765',
      value: 'text {{ componentProps.name }}',
    },
  },
}

export const pageRowElement = {
  atom: IAtomType.AntDesignGridRow,
  id: v4(),
  name: 'Row',
}

export const pageRowChild1 = {
  atom: IAtomType.ReactFragment,
  id: v4(),
  name: 'Child 1',
  parentElement: { id: pageRowElement.id },
}

export const pageRowChild2 = {
  atom: IAtomType.ReactFragment,
  id: v4(),
  name: 'Child 2',
  prevSibling: { id: pageRowChild1.id },
}

export const providerPageElements = (
  page: IPageDto,
): Array<ICreateElementData> => [
  {
    ...pageRowElement,
    parentElement: page.rootElement,
  },
  pageRowChild1,
  pageRowChild2,
]

export const seedTestData = async (request: APIRequestContext) => {
  const appResponse = await request.post('/api/v1/app/seed-cypress-app')
  const app: IApp = await appResponse.json()
  const page = app.pages[0]!

  await request.post(`/api/v1/element/${page.rootElement.id}/create-elements`, {
    data: providerPageElements(page),
  })

  const componentResponse = await request.post(
    '/api/v1/component/create-component',
    { data: childMapperComponent },
  )

  const component = await componentResponse.json()

  await request.post(
    `/api/v1/element/${component.rootElement.id}/create-elements`,
    {
      data: [
        {
          ...childMapperComponentTypography,
          parentElement: component.rootElement,
        },
      ],
    },
  )

  return app
}
