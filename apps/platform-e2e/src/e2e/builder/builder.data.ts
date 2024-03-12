import type {
  ICreateCypressElementData,
  ICreateElementData,
  IPageDto,
} from '@codelab/shared/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { v4 } from 'uuid'

/**
 * Since UI requires label, we can find the label through the data
 */

export const elementRow: ICreateCypressElementData = {
  atom: IAtomType.AntDesignGridRow,
  id: v4(),
  name: 'Row',
  parentElement: ROOT_ELEMENT_NAME,
}

const elementColA: ICreateCypressElementData = {
  id: v4(),
  name: 'Column A',
  parentElement: elementRow.name,
}

const elementTextA: ICreateCypressElementData = {
  id: v4(),
  name: 'Column A Text',
  parentElement: elementColA.name,
}

const elementColB: ICreateCypressElementData = {
  id: v4(),
  name: 'Column B',
  parentElement: elementRow.name,
}

const elementButton: ICreateCypressElementData = {
  id: v4(),
  name: 'Button',
  parentElement: elementColB.name,
}

const elementButtonText: ICreateCypressElementData = {
  id: v4(),
  name: 'Button Text',
  parentElement: elementButton.name,
}

export const builderElements = [
  elementButtonText,
  elementColA,
  elementColB,
  elementRow,
  elementTextA,
]
