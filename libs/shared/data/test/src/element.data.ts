import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import type { IElementDTO, IPropDTO } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

/**
 * IPageKind.Provider
 */
export const providerElementPropsData: IPropDTO = {
  data: '{}',
  id: v4(),
}

export const providerElementData: IElementDTO = {
  id: v4(),
  name: ROOT_ELEMENT_NAME,
  props: providerElementPropsData,
}

/**
 * IPageKind.NotFound
 */
export const notFoundElementPropsData: IPropDTO = {
  data: '{}',
  id: v4(),
}

export const notFoundElementData: IElementDTO = {
  id: v4(),
  name: ROOT_ELEMENT_NAME,
  props: notFoundElementPropsData,
}

/**
 * IPageKind.InternalServerError
 */
export const internalServerErrorPropsData: IPropDTO = {
  data: '{}',
  id: v4(),
}

export const internalServerErrorElementData: IElementDTO = {
  id: v4(),
  name: ROOT_ELEMENT_NAME,
  props: internalServerErrorPropsData,
}
