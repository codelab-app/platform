import {
  IBreakpointType,
  type IPreferenceDto,
} from '@codelab/shared/abstract/core'
import { breakpoints } from '@codelab/shared/domain'
import { v4 } from 'uuid'
import { userDto } from './user.data'

export const preferenceDto: IPreferenceDto = {
  builderBreakpointType: IBreakpointType.Desktop,
  builderWidth: breakpoints[IBreakpointType.Desktop].default,
  id: v4(),
  owner: userDto,
}
