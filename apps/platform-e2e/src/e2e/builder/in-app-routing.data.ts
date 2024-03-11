import type { IAppDto, ICreateElementData } from '@codelab/shared/abstract/core'
import { IAtomType, IPageKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

const TestPageText = 'this is the test page'
const DynamicPageText = 'this is the dynamic page'
const GoToTestPageText = 'go to test page'
const GoToDynamicPageText = 'go to dynamic page'
const dynamicUrlFirstSegmentKey = 'testId'
const dynamicUrlFirstSegment = 'first-url-segment'
const dynamicUrlSecondSegmentKey = 'subtestId'
const dynamicUrlSecondSegment = 'second-url-segment'

export const buildTestData = (app: IAppDto) => {
  const providerPageLinkElementCreateData: ICreateElementData = {
    atom: IAtomType.NextLink,
    id: v4(),
    name: 'Test Page Link',
    // parentElement: { id: providerPage.rootElement.id },
    propsData: {
      customText: GoToTestPageText,
      href: '/test-page',
    },
  }

  const staticPageCreateData = {
    app,
    id: v4(),
    kind: IPageKind.Regular,
    name: 'Test Page',
    url: '/test-page',
  }

  const staticPageTextElementCreateData: ICreateElementData = {
    atom: IAtomType.AntDesignTypographyText,
    id: v4(),
    name: 'Test Page Content',
    // parentElement: { id: staticPage.rootElement.id },
    propsData: {
      customText: TestPageText,
    },
  }

  const staticPageLinkElementCreateData: ICreateElementData = {
    atom: IAtomType.NextLink,
    id: v4(),
    name: 'Dynamic Page Link',
    prevSibling: { id: staticPageTextElementCreateData.id },
    propsData: {
      customText: GoToDynamicPageText,
      href: `/tests/${dynamicUrlFirstSegment}/subtests/${dynamicUrlSecondSegment}`,
    },
  }

  const dynamicPageCreateData = {
    app,
    id: v4(),
    kind: IPageKind.Regular,
    name: 'Dynamic Page',
    url: `/tests/:${dynamicUrlFirstSegmentKey}/subtests/:${dynamicUrlSecondSegmentKey}`,
  }

  const dynamicPageTextElementCreateData: ICreateElementData = {
    atom: IAtomType.AntDesignTypographyText,
    id: v4(),
    name: 'Dynamic Page Content',
    // parentElement: { id: dynamicPage.rootElement.id },
    propsData: {
      customText: `${DynamicPageText} - ${dynamicUrlFirstSegmentKey}: "{{urlProps.${dynamicUrlFirstSegmentKey}}}", ${dynamicUrlSecondSegmentKey}: "{{urlProps.${dynamicUrlSecondSegmentKey}}}"`,
    },
  }

  return {
    dynamicPageCreateData,
    dynamicPageTextElementCreateData,
    providerPageLinkElementCreateData,
    staticPageCreateData,
    staticPageLinkElementCreateData,
    staticPageTextElementCreateData,
  }
}
