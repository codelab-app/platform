import type { ICreateElementData, IRef } from '@codelab/shared/abstract/core'
import { IAtomType } from '@codelab/shared/abstract/core'
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
