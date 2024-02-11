import type {
  AppTypeCreateInput,
  UpdateAppTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type { IAppTypeDto, ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseTypeModel } from './base-type.model.interface'

/**
 * Allows choosing an app from the list of apps.
 */
export interface IAppTypeModel
  extends IBaseTypeModel<
    IAppTypeDto,
    AppTypeCreateInput,
    UpdateAppTypesMutationVariables
  > {
  kind: ITypeKind.AppType
}
