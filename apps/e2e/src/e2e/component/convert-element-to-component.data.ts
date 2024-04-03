import type {
  ICreateElementData,
  IPageDto,
} from '@codelab/shared/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export const elementContainerCreateData: ICreateElementData = {
  atom: IAtomType.ReactFragment,
  id: v4(),
  name: 'Container',
}

export const elementRowCreateData: ICreateElementData = {
  atom: IAtomType.AntDesignGridRow,
  id: v4(),
  name: 'Row',
  parentElement: elementContainerCreateData,
}

export const elementColCreateData: ICreateElementData = {
  atom: IAtomType.AntDesignGridCol,
  id: v4(),
  name: 'Column',
  parentElement: elementRowCreateData,
}

export const elementTextCreateData: ICreateElementData = {
  atom: IAtomType.AntDesignTypographyText,
  id: v4(),
  name: 'Text',
  parentElement: elementColCreateData,
}

export const providerPageElements = (
  page: IPageDto,
): Array<ICreateElementData> => [
  {
    ...elementContainerCreateData,
    parentElement: page.rootElement,
  },
  elementRowCreateData,
  elementColCreateData,
  elementTextCreateData,
]
