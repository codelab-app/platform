import {
  IConfigPaneTab,
  type IPreferenceDto,
} from '@codelab/shared/abstract/core'
import {
  breakpoints,
  DEFAULT_BUILDER_BREAKPOINT,
} from '@codelab/shared/config/builder'
import { v4 } from 'uuid'

/**
 * Initial default data
 */
export const preferenceDefault: IPreferenceDto = {
  activeConfigPaneTab: IConfigPaneTab.Node,
  builderBreakpointType: DEFAULT_BUILDER_BREAKPOINT,
  builderWidth: breakpoints[DEFAULT_BUILDER_BREAKPOINT].default,
  id: v4(),
}
