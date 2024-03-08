import {
  IAtomType,
  type ICreateComponentData,
  type ICreateElementData,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

const COMPONENT_NAME = 'Component Name'

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
