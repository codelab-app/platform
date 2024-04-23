import {
  IAtomType,
  type ICreateCypressElementData,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

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
  propsData: {
    children: {
      kind: ITypeKind.RichTextType,
      type: v4(),
      value: '',
    },
  },
}

export const componentElements: Array<ICreateCypressElementData> = [
  elementSpace,
  elementText,
]
