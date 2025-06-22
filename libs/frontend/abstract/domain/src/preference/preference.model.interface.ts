import type {
  IBreakpoint,
  IBreakpointType,
  IConfigPaneTab,
  IPreferenceDto,
} from '@codelab/shared-abstract-core'

import type { IModel } from '../shared'

export interface IPreferenceModel
  extends IModel<IPreferenceDto, IPreferenceModel> {
  activeConfigPaneTab: IConfigPaneTab
  builderBreakpoint: IBreakpoint
  builderBreakpointType: IBreakpointType
  builderWidth: number
  id: string
}
