import {
  IAtomType,
  type ICreateCypressElementData,
} from '@codelab/shared/abstract/core'

export const createComponentData = {
  name: 'Component Name',
}

export const elementSpace: ICreateCypressElementData = {
  atom: IAtomType.AntDesignSpace,
  name: 'Space',
  parentElement: `${createComponentData.name} Root`,
}

const elementText: ICreateCypressElementData = {
  atom: IAtomType.AntDesignTypographyText,
  name: 'Component',
  parentElement: elementSpace.name,
}

export const componentElements: Array<ICreateCypressElementData> = [
  elementSpace,
  elementText,
]
