import type {
  AppTypeCreateInput,
  UpdateAppTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { IBaseType } from '../base-type'
import type { IAppTypeDTO } from './app-type.dto.interface'

/**
 * Allows choosing an app from the list of apps.
 */
export interface IAppType
  extends Omit<
    IBaseType<
      IAppTypeDTO,
      AppTypeCreateInput,
      UpdateAppTypesMutationVariables,
      void
    >,
    'toDeleteInput'
  > {
  kind: ITypeKind.AppType
}
