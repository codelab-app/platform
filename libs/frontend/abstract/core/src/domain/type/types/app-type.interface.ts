import type {
  AppTypeCreateInput,
  UpdateAppTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type { IAppTypeDTO, ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseType } from './base-type.interface'

/**
 * Allows choosing an app from the list of apps.
 */
export interface IAppType
  extends IBaseType<
    IAppTypeDTO,
    AppTypeCreateInput,
    UpdateAppTypesMutationVariables
  > {
  kind: ITypeKind.AppType
}
