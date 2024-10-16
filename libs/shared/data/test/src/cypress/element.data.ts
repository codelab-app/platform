import type {
  ICreateElementDto,
  IElementRenderTypeDto,
  IPropDto,
  IRef,
} from '@codelab/shared/abstract/core'

import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { v4 } from 'uuid'

/**
 * IPageKind.Provider
 */
export const providerElementPropsData: IPropDto = {
  data: '{}',
  id: v4(),
}

export const providerElementData = (
  closestContainerNode: IRef,
  renderType: IElementRenderTypeDto,
): ICreateElementDto => ({
  closestContainerNode,
  id: v4(),
  name: ROOT_ELEMENT_NAME,
  props: providerElementPropsData,
  renderType,
})

/**
 * IPageKind.NotFound
 */
export const notFoundElementPropsData: IPropDto = {
  data: '{}',
  id: v4(),
}

export const notFoundElementData = (
  closestContainerNode: IRef,
  renderType: IElementRenderTypeDto,
): ICreateElementDto => ({
  closestContainerNode,
  id: v4(),
  name: ROOT_ELEMENT_NAME,
  props: notFoundElementPropsData,
  renderType,
})

/**
 * IPageKind.InternalServerError
 */
export const internalServerErrorPropsData: IPropDto = {
  data: '{}',
  id: v4(),
}

export const internalServerErrorElementData = (
  closestContainerNode: IRef,
  renderType: IElementRenderTypeDto,
): ICreateElementDto => ({
  closestContainerNode,
  id: v4(),
  name: ROOT_ELEMENT_NAME,
  props: internalServerErrorPropsData,
  renderType,
})
