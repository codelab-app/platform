import type {
  IApp,
  ICreateElementSeedData,
  IPage,
  IPageCreateFormData,
  IPageCreateSeedData,
} from '@codelab/shared/abstract/core'
import type { APIRequestContext } from '@playwright/test'

import { IAtomType } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config/env'

export const elementRow: ICreateElementSeedData = {
  atom: IAtomType.AntDesignGridRow,
  name: 'Grid Row',
  parentElement: ROOT_ELEMENT_NAME,
}

export const elementColA: ICreateElementSeedData = {
  atom: IAtomType.AntDesignGridCol,
  name: 'Column A',
  parentElement: elementRow.name,
}

export const elementTextA: ICreateElementSeedData = {
  atom: IAtomType.AntDesignTypographyText,
  name: 'Column A Text',
  parentElement: elementColA.name,
  propsData: `{
    "children": {
      "kind": "RichTextType",
      "type": "e7558508-3bb7-4f57-8f8c-6ac989911765",
      "value": "<p class=\\"editor-paragraph\\">Ant Design Text Element</p>"
    }
  }`,
}

export const elementColB: ICreateElementSeedData = {
  atom: IAtomType.AntDesignGridCol,
  name: 'Column B',
  parentElement: elementRow.name,
}

export const elementColC: ICreateElementSeedData = {
  atom: IAtomType.AntDesignGridCol,
  name: 'Column C',
  parentElement: elementRow.name,
}

export const elementButton: ICreateElementSeedData = {
  atom: IAtomType.AntDesignButton,
  name: 'Button',
  parentElement: elementColB.name,
}

export const elementButtonText: ICreateElementSeedData = {
  atom: IAtomType.AntDesignTypographyText,
  name: 'Button Text',
  parentElement: elementButton.name,
  propsData: `{
    "children": {
      "kind": "RichTextType",
      "type": "e7558508-3bb7-4f57-8f8c-6ac989911765",
      "value": "<p class=\\"editor-paragraph\\">Click Me!</p>"
    }
  }`,
}

export const builderElements = [
  elementRow,
  elementColA,
  elementTextA,
  elementColB,
  elementButton,
  elementButtonText,
  elementColC,
]

export const seedAppData = async (
  request: APIRequestContext,
  data?: {
    page: IPageCreateSeedData
  },
) => {
  const result = await request.post('/api/v1/app/seed-cypress-app', {
    data,
  })

  return result.json() as Promise<IApp>
}

export const seedPageData = async (
  request: APIRequestContext,
  data: IPageCreateFormData,
) => {
  const result = await request.post('/api/v1/page/create', {
    data,
  })

  return result.json() as Promise<IPage>
}
