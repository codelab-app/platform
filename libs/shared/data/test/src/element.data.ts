import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import type {
  ICreateElementDTO,
  IElementDTO,
  IPropDTO,
} from '@codelab/shared/abstract/core'
import type { IEntity } from '@codelab/shared/abstract/types'
import { v4 } from 'uuid'

/**
 * IPageKind.Provider
 */
export const providerElementPropsData: IPropDTO = {
  data: '{}',
  id: v4(),
}

export const providerElementData = (
  closestContainerNode: IEntity,
): IElementDTO => ({
  closestContainerNode,
  id: v4(),
  name: ROOT_ELEMENT_NAME,
  props: providerElementPropsData,
})

/**
 * IPageKind.NotFound
 */
export const notFoundElementPropsData: IPropDTO = {
  data: '{}',
  id: v4(),
}

export const notFoundElementData = (
  closestContainerNode: IEntity,
): IElementDTO => ({
  closestContainerNode,
  id: v4(),
  name: ROOT_ELEMENT_NAME,
  props: notFoundElementPropsData,
})

/**
 * IPageKind.InternalServerError
 */
export const internalServerErrorPropsData: IPropDTO = {
  data: '{}',
  id: v4(),
}

export const internalServerErrorElementData = (
  closestContainerNode: IEntity,
): IElementDTO => ({
  closestContainerNode,
  id: v4(),
  name: ROOT_ELEMENT_NAME,
  props: internalServerErrorPropsData,
})
