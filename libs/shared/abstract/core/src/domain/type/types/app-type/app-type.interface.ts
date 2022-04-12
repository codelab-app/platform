import { IBaseType } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'

/**
 * Allows choosing an app from the list of apps.
 */
export interface IAppType extends IBaseType {
  typeKind: typeof TypeKind.AppType
}
