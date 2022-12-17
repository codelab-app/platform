import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseType } from '../base-type'

/**
 * Allows choosing an app from the list of apps.
 */
export interface IAppType extends IBaseType {
  kind: ITypeKind.AppType
}
