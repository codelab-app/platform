import type {
  IApp,
  IComponentType,
  ICreateElementSeedData,
  IPage,
  IPageCreateFormData,
  IPageCreateSeedData,
} from '@codelab/shared/abstract/core'
import type { APIRequestContext } from '@playwright/test'

import { IAtomType, ITypeKind } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config/env'

import { requestOrThrow } from '../../api'
import { logTimestamp } from '../../commands'
import { jobOutputRequest } from '../../job-request'
import { REQUEST_TIMEOUT } from '../../setup/config'

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
  propsData: {
    children: {
      kind: ITypeKind.RichTextType,
      type: 'e7558508-3bb7-4f57-8f8c-6ac989911765',
      value: 'Ant Design Text Element',
    },
  },
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
  propsData: {
    children: {
      kind: ITypeKind.RichTextType,
      type: 'e7558508-3bb7-4f57-8f8c-6ac989911765',
      value: 'Click Me!',
    },
  },
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
    page?: IPageCreateSeedData
    atomTypes?: Array<IAtomType>
    componentTypes?: Array<IComponentType>
  },
) => {
  logTimestamp('Seeding app data...')

  const results = await jobOutputRequest<IApp>(
    request,
    '/api/v1/app/seed-e2e-app',
    {
      data,
      timeout: REQUEST_TIMEOUT,
    },
  )

  return results.data
}

export const seedPageData = async (
  request: APIRequestContext,
  data: IPageCreateFormData,
) => {
  console.log('Seeding page data')

  return requestOrThrow<IPage>(request, '/api/v1/page/create', {
    data,
    timeout: REQUEST_TIMEOUT,
  })
}
