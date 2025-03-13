import type {
  IComponentDto,
  ICreateComponentData,
  ICreateElementData,
  IPageDto,
  IRef,
} from '@codelab/shared/abstract/core'

import {
  ComponentDtoSchema,
  IAtomType,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { Validator } from '@codelab/shared/infra/typebox'
import { type APIRequestContext } from '@playwright/test'
import { v4 } from 'uuid'

import { requestOrThrow } from '../../api'
import { REQUEST_TIMEOUT } from '../../setup/config'
import { seedAppData } from '../app/app.data'

export const childMapperComponentName = 'Component Name'

export const childMapperComponent: (owner: IRef) => ICreateComponentData = (
  owner,
) => ({
  id: v4(),
  name: childMapperComponentName,
  owner,
})

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

/**
 * We create multiple siblings to test that the child mapper can render in any  sibling location
 */
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
  const app = await seedAppData(request, {
    atomTypes: [IAtomType.AntDesignTypographyText, IAtomType.AntDesignGridRow],
    componentTypes: [],
  })

  const page = app.pages?.[0]

  if (!page) {
    throw new Error('Missing page')
  }

  const ownerResponse = await request.get('/api/v1/user/me', {
    timeout: REQUEST_TIMEOUT,
  })

  const owner = await ownerResponse.json()

  await requestOrThrow(
    request,
    `/api/v1/element/${page.rootElement.id}/create-elements`,
    {
      data: providerPageElements(page),
      timeout: REQUEST_TIMEOUT,
    },
  )

  const componentResponse = await requestOrThrow<IComponentDto>(
    request,
    '/api/v1/component/create-component',
    {
      data: childMapperComponent(owner),
      timeout: REQUEST_TIMEOUT,
    },
  )

  const component: IComponentDto = Validator.parse(
    ComponentDtoSchema,
    await componentResponse,
  )

  await requestOrThrow(
    request,
    `/api/v1/element/${component.rootElement.id}/create-elements`,
    {
      data: [
        {
          ...childMapperComponentTypography,
          parentElement: component.rootElement,
        },
      ],
      timeout: REQUEST_TIMEOUT,
    },
  )

  return app
}
