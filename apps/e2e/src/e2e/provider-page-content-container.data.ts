import type {
  IAppDto,
  ICreateElementData,
  ICreatePageData,
  IPageDto,
} from '@codelab/shared/abstract/core'
import { IAtomType, IPageKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const pageContentContainerName = 'Provider Card'

export const providerPageCardElementCreateData = (
  page: IPageDto,
): ICreateElementData => ({
  atom: IAtomType.AntDesignCard,
  id: v4(),
  name: pageContentContainerName,
  parentElement: page.rootElement,
})

export const regularPageInputElementCreateData = (
  page: IPageDto,
): ICreateElementData => ({
  atom: IAtomType.AntDesignInput,
  id: v4(),
  name: 'Input',
  parentElement: page.rootElement,
})

export const regularPageCreateData = (app: IAppDto): ICreatePageData => ({
  app,
  id: v4(),
  kind: IPageKind.Regular,
  name: 'Test Page',
  urlPattern: '/test-page',
})
