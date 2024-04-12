import type {
  ICreateComponentData,
  ICreateElementData,
  IPageDto,
} from '@codelab/shared/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const childMapperComponent: ICreateComponentData = {
  id: v4(),
  name: 'Component Name',
}

export const childMapperComponentElementTypography: ICreateElementData = {
  atom: IAtomType.AntDesignTypographyText,
  id: v4(),
  name: 'Text Content',
  propsData: {
    customText: 'text {{ componentProps.name }}',
  },
}

export const providerPageRowElement: ICreateElementData = {
  atom: IAtomType.AntDesignGridRow,
  id: v4(),
  name: 'Row',
}

export const providerPageRowFirstChild: ICreateElementData = {
  atom: IAtomType.ReactFragment,
  id: v4(),
  name: 'Child 1',
  parentElement: { id: providerPageRowElement.id },
}

export const providerPageRowSecondChild: ICreateElementData = {
  atom: IAtomType.ReactFragment,
  id: v4(),
  name: 'Child 2',
  prevSibling: { id: providerPageRowFirstChild.id },
}

export const providerPageElements = (
  page: IPageDto,
): Array<ICreateElementData> => [
  {
    ...providerPageRowElement,
    parentElement: page.rootElement,
  },
  providerPageRowFirstChild,
  providerPageRowSecondChild,
]
