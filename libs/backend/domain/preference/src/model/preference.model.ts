import type {
  IBreakpointType,
  IPreference,
  IPreferenceDto,
  IRef,
} from '@codelab/shared/abstract/core'

import { IModel } from '@codelab/backend/abstract/types'

export class Preference extends IModel implements IPreference {
  builderBreakpointType: IBreakpointType

  builderWidth: number

  id: string

  owner: IRef

  constructor({
    builderBreakpointType,
    builderWidth,
    id,
    owner,
  }: IPreferenceDto) {
    super()

    this.builderBreakpointType = builderBreakpointType
    this.builderWidth = builderWidth
    this.id = id
    this.owner = owner
  }
}
