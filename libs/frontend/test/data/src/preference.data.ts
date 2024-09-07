import { IBreakpoint, type IPreferenceDto } from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'
import { userDto } from './user.data'

export const preferenceDto: IPreferenceDto = {
  builderBreakpoint: IBreakpoint.Desktop,
  builderWidth: 400,
  id: v4(),
  owner: userDto,
}
