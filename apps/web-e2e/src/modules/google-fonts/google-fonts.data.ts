import {
  IAtomType,
  IComponentType,
  type ICreateElementSeedData,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config/env'
import { type APIRequestContext } from '@playwright/test'
import { v4 } from 'uuid'

import { requestOrThrow } from '../../api'
import { REQUEST_TIMEOUT } from '../../setup/config'
import { seedAppData } from '../app/app.data'

export const FONT_NAME = 'Google Fonts Montserrat'
export const FONT_SIZE = 700

export const googleFontsElement: ICreateElementSeedData = {
  atom: 'Google Fonts',
  name: 'Google Fonts Link',
  parentElement: ROOT_ELEMENT_NAME,
}

export const typographyElement = {
  atom: IAtomType.AntDesignTypographyText,
  id: v4(),
  name: 'Text Element',
  propsData: {
    children: {
      kind: ITypeKind.RichTextType,
      type: 'e7558508-3bb7-4f57-8f8c-6ac989911765',
      value: 'Testing fonts',
    },
  },
}

export const seedTestData = async (request: APIRequestContext) => {
  const app = await seedAppData(request, {
    atomTypes: [IAtomType.AntDesignTypographyText, IAtomType.HtmlLink],
    componentTypes: [IComponentType.GoogleFonts],
  })

  const page = app.pages![0]!

  await requestOrThrow(request, `element/${page.id}/create-elements`, {
    data: [{ ...typographyElement, parentElement: page.rootElement }],
    timeout: REQUEST_TIMEOUT,
  })

  return app
}
