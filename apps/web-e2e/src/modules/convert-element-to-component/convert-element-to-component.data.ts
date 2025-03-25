import type {
  ICreateElementData,
  IPage,
  IPageDto,
} from '@codelab/shared/abstract/core'
import type { APIRequestContext } from '@playwright/test'

import { IAtomType, IPageKind, ITypeKind } from '@codelab/shared/abstract/core'
import { findOrFail } from '@codelab/shared/utils'
import { v4 } from 'uuid'

import { requestOrThrow } from '../../api'
import { REQUEST_TIMEOUT } from '../../setup/config'
import { seedAppData } from '../app/app.data'

export const componentName = 'Container'
export const textContent = 'Text Element Content'

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
  propsData: {
    children: {
      kind: ITypeKind.RichTextType,
      type: 'e7558508-3bb7-4f57-8f8c-6ac989911765',
      value: textContent,
    },
  },
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
  const app = await seedAppData(request, {
    atomTypes: [
      IAtomType.AntDesignGridRow,
      IAtomType.AntDesignGridCol,
      IAtomType.AntDesignTypographyText,
    ],
    componentTypes: [],
  })

  const page: IPage = findOrFail(
    app.pages,
    ({ kind }) => kind === IPageKind.Provider,
  )

  await requestOrThrow(
    request,
    `element/${page.rootElement.id}/create-elements`,
    {
      data: providerPageElements(page),
      timeout: REQUEST_TIMEOUT,
    },
  )

  return app
}
