import type { ICreateCypressElementData } from '@codelab/shared/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'

/**
 * Since UI requires label, we can find the label through the data
 */

export const elementRow: ICreateCypressElementData = {
  atom: IAtomType.AntDesignGridRow,
  name: 'Row',
  parentElement: ROOT_ELEMENT_NAME,
}

const elementColA: ICreateCypressElementData = {
  name: 'Column A',
  parentElement: elementRow.name,
}

const elementTextA: ICreateCypressElementData = {
  name: 'Column A Text',
  parentElement: elementColA.name,
}

const elementColB: ICreateCypressElementData = {
  name: 'Column B',
  parentElement: elementRow.name,
}

const elementButton: ICreateCypressElementData = {
  name: 'Button',
  parentElement: elementColB.name,
}

const elementButtonText: ICreateCypressElementData = {
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
