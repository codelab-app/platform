import type {
  IAppDto,
  ICreateElementData,
  ICreatePageData,
} from '@codelab/shared/abstract/core'
import { IAtomType, IPageKind, ITypeKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { systemTypesIds } from '../system-types.data'

export const testUrlProps = {
  subtestId: 'second-url-segment',
  testId: 'first-url-segment',
}

export const providerPageLinkElementCreateData: ICreateElementData = {
  atom: IAtomType.NextLink,
  id: v4(),
  name: 'Test Page Link',
  propsData: {
    children: {
      kind: ITypeKind.RichTextType,
      type: systemTypesIds[ITypeKind.RichTextType],
      value: 'go to test page',
    },
    href: '/test-page',
  },
}
export const staticPageTextElementCreateData: ICreateElementData = {
  atom: IAtomType.AntDesignTypographyText,
  id: v4(),
  name: 'Test Page Content',
  propsData: {
    children: {
      kind: ITypeKind.RichTextType,
      type: systemTypesIds[ITypeKind.RichTextType],
      value: 'this is the test page',
    },
  },
}
export const staticPageLinkElementCreateData: ICreateElementData = {
  atom: IAtomType.NextLink,
  id: v4(),
  name: 'Dynamic Page Link',
  prevSibling: { id: staticPageTextElementCreateData.id },
  propsData: {
    children: {
      kind: ITypeKind.RichTextType,
      type: systemTypesIds[ITypeKind.RichTextType],
      value: 'go to dynamic page',
    },
    href: `/tests/${testUrlProps.testId}/subtests/${testUrlProps.subtestId}`,
  },
}
export const dynamicPageTextElementCreateData: ICreateElementData = {
  atom: IAtomType.AntDesignTypographyText,
  id: v4(),
  name: 'Dynamic Page Content',
  propsData: {
    children: {
      kind: ITypeKind.RichTextType,
      type: systemTypesIds[ITypeKind.RichTextType],
      value:
        'testId: "{{urlProps.testId}}", subtestId: "{{urlProps.subtestId}}"',
    },
  },
}

export const buildTestPages = (app: IAppDto) => {
  const staticPageCreateData: ICreatePageData = {
    app,
    id: v4(),
    kind: IPageKind.Regular,
    name: 'Test Page',
    urlPattern: '/test-page',
  }

  const dynamicPageCreateData: ICreatePageData = {
    app,
    id: v4(),
    kind: IPageKind.Regular,
    name: 'Dynamic Page',
    urlPattern: '/tests/:testId/subtests/:subtestId',
  }

  return {
    dynamicPageCreateData,
    staticPageCreateData,
  }
}
