import { IBaseType, ITypeKind } from '../base-type'

/**
 * Allows choosing an app from the list of apps.
 */
export interface IAppType extends IBaseType {
  kind: ITypeKind.AppType
}
