import type {
  ICreateComponentData,
  ICreateElementData,
  IRef,
} from '@codelab/shared/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const COMPONENT_NAME = 'Component Name'

export interface ComponentChildData {
  atom: string
  name: string
}

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

export const componentChildren = [
  { atom: IAtomType.AntDesignSpace, name: 'Space' },
  { atom: IAtomType.AntDesignTypographyText, name: 'Typography' },
]

export const childMapperComponent: ICreateComponentData = {
  id: v4(),
  name: COMPONENT_NAME,
  rootElement: {
    id: v4(),
  },
}

const childMapperComponentElementTypography: ICreateElementData = {
  atom: IAtomType.AntDesignTypographyText,
  id: v4(),
  name: 'Typography',
  parentElement: { id: childMapperComponent.rootElement!.id },
  propsData: {
    customText: 'text {{ componentProps.name }}',
  },
}

const childMapperComponentElementSpace: ICreateElementData = {
  atom: IAtomType.AntDesignSpace,
  id: v4(),
  name: 'Space',
  prevSibling: { id: childMapperComponentElementTypography.id },
}

export const childMapperComponentElements: Array<ICreateElementData> = [
  childMapperComponentElementSpace,
  childMapperComponentElementTypography,
]
