import type {
  IAppDto,
  ICreateComponentData,
  ICreateElementData,
  ICreatePageDto,
  IPageDto,
  IRef,
} from '@codelab/shared/abstract/core'
import { IAtomType, IPageKind } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const COMPONENT_NAME = 'Component Name'

const spaceElementId = v4()

export const spaceElementName = IAtomType.AntDesignSpace

export const spaceElement = (rootElement: IRef): ICreateElementData => ({
  atom: IAtomType.AntDesignSpace,
  id: spaceElementId,
  name: spaceElementName,
  parentElement: { id: rootElement.id },
})

export const typographyTextElement = {
  atom: IAtomType.AntDesignTypographyText,
  id: v4(),
  name: IAtomType.AntDesignTypographyText,
  parentElement: { id: spaceElementId },
}

export const regularPageCreateData = (app: IAppDto): ICreatePageDto => ({
  app,
  id: v4(),
  kind: IPageKind.Regular,
  name: 'Test Page',
  url: 'test-page',
})

export const componentCreateData: ICreateComponentData = {
  id: v4(),
  name: COMPONENT_NAME,
}

export const componentElementCreateData = (
  page: IPageDto,
): ICreateElementData => ({
  component: COMPONENT_NAME,
  id: v4(),
  name: COMPONENT_NAME,
  parentElement: { id: page.rootElement.id },
})
