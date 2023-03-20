import type { IElementDTO, IPropDTO } from '@codelab/frontend/abstract/core'
import { IPageKindName } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

/**
 * IPageKind.Provider
 */
export const providerElementPropsData: IPropDTO = {
  id: v4(),
}

export const providerElementData: IElementDTO = {
  id: v4(),
  name: IPageKindName.Provider,
  props: providerElementPropsData,
}

/**
 * IPageKind.NotFound
 */
export const notFoundElementPropsData: IPropDTO = {
  id: v4(),
}

export const notFoundElementData: IElementDTO = {
  id: v4(),
  name: IPageKindName.NotFound,
  props: notFoundElementPropsData,
}

/**
 * IPageKind.InternalServerError
 */
export const internalServerErrorPropsData: IPropDTO = {
  id: v4(),
}

export const internalServerErrorElementData: IElementDTO = {
  id: v4(),
  name: IPageKindName.InternalServerError,
  props: internalServerErrorPropsData,
}
