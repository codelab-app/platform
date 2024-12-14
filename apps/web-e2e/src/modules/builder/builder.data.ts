import type {
  IApp,
  ICreateCypressElementData,
} from '@codelab/shared/abstract/core'
import type { APIRequestContext } from '@playwright/test'

import { IAtomType } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config/env'

export const elementRow: ICreateCypressElementData = {
  atom: IAtomType.AntDesignGridRow,
  name: 'Grid Row',
  parentElement: ROOT_ELEMENT_NAME,
}

export const elementColA: ICreateCypressElementData = {
  atom: IAtomType.AntDesignGridCol,
  name: 'Column A',
  parentElement: elementRow.name,
}

export const elementTextA: ICreateCypressElementData = {
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

export const elementColB: ICreateCypressElementData = {
  atom: IAtomType.AntDesignGridCol,
  name: 'Column B',
  parentElement: elementRow.name,
}

export const elementColC: ICreateCypressElementData = {
  atom: IAtomType.AntDesignGridCol,
  name: 'Column C',
  parentElement: elementRow.name,
}

export const elementButton: ICreateCypressElementData = {
  atom: IAtomType.AntDesignButton,
  name: 'Button',
  parentElement: elementColB.name,
}

export const elementButtonText: ICreateCypressElementData = {
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

export const seedAppData = async (request: APIRequestContext) => {
  const result = await request.post('/api/v1/app/seed-cypress-app')

  return result.json() as Promise<IApp>
}
