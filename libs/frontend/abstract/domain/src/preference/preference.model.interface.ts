import type {
  IBreakpoint,
  IBreakpointType,
  IPreferenceDto,
} from '@codelab/shared/abstract/core'

import type { IModel } from '../shared'

export interface IPreferenceModel
  extends IModel<IPreferenceDto, IPreferenceModel> {
  builderBreakpoint: IBreakpoint
  builderBreakpointType: IBreakpointType
  builderWidth: number
  id: string
}
