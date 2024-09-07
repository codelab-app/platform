import {
  IBreakpointType,
  type IPreferenceDto,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { userDto } from './user.data'

export const preferenceDto: IPreferenceDto = {
  builderBreakpointType: IBreakpointType.None,
  builderWidth: -1,
  id: v4(),
  owner: userDto,
}
