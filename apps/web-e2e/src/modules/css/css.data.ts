import { IAtomType } from '@codelab/shared-abstract-core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared-config-env'

export const ELEMENT_BUTTON = 'Button'
export const defaultColor = 'rgb(255, 255, 255)'
export const backgroundColor1 = 'rgb(48, 182, 99)'
export const backgroundColor2 = 'rgb(182, 99, 48)'
export const displayNone = 'none'
export const elementName = `Element ${ELEMENT_BUTTON}`
export const buttonElement = {
  atom: IAtomType.AntDesignButton,
  name: elementName,
  parentElement: ROOT_ELEMENT_NAME,
}
export const providerPageElements = [buttonElement]
