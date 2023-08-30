import { ROOT_ELEMENT_NAME } from '@codelab/frontend/abstract/core'
import {
  IContainerNodeKind,
  type IElementDTO,
  type IPropDTO,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

/**
 * IPageKind.Provider
 */
export const providerElementPropsData: IPropDTO = {
  data: '{}',
  id: v4(),
}

export const providerElementData: IElementDTO = {
  closestContainerNode: {
    id: v4(),
    kind: IContainerNodeKind.Page,
  },
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
  closestContainerNode: {
    id: v4(),
    kind: IContainerNodeKind.Page,
  },
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
  closestContainerNode: {
    id: v4(),
    kind: IContainerNodeKind.Page,
  },
  id: v4(),
  name: ROOT_ELEMENT_NAME,
  props: internalServerErrorPropsData,
}
