import type {
  IBreakpointType,
  IPreference,
  IPreferenceDto,
  IRef,
} from '@codelab/shared/abstract/core'

import { IModel } from '@codelab/shared/abstract/core'

export class Preference extends IModel implements IPreference {
  builderBreakpointType: IBreakpointType

  builderWidth: number

  id: string

  constructor({ builderBreakpointType, builderWidth, id }: IPreferenceDto) {
    super()

    this.builderBreakpointType = builderBreakpointType
    this.builderWidth = builderWidth
    this.id = id
  }
}
