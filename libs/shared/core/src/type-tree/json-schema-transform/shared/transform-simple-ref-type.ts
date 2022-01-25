import { IAppType, ILambdaType, IPageType } from '@codelab/shared/abstract/core'
import { TypeTransformFn } from './types'
import { getExtraProperties } from './utils'

type SimpleRefType = ILambdaType | IAppType | IPageType

/**
 * Handles simple reference types that represent a string ID property
 */
export const transformSimpleRefType: TypeTransformFn<SimpleRefType> = (
  type,
  options,
) => {
  const extra = getExtraProperties(type, options)

  return { type: 'string', ...extra }
}
