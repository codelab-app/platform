import {
  breakpoints,
  DEFAULT_BUILDER_BREAKPOINT,
} from '@codelab/frontend/shared/config'
import { type IPreferenceDto } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

import { userDto } from './user.data'

export const preferenceDto: IPreferenceDto = {
  builderBreakpointType: DEFAULT_BUILDER_BREAKPOINT,
  builderWidth: breakpoints[DEFAULT_BUILDER_BREAKPOINT].default,
  id: v4(),
  owner: userDto,
}
