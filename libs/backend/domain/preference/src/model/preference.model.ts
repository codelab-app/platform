import { IModel } from '@codelab/backend/abstract/types'
import type {
  IBreakpoint,
  IPreference,
  IPreferenceDto,
  IRef,
} from '@codelab/shared/abstract/core'

export class Preference extends IModel implements IPreference {
  builderBreakpoint: IBreakpoint

  builderWidth: number

  id: string

  owner: IRef

  constructor({ builderBreakpoint, builderWidth, id, owner }: IPreferenceDto) {
    super()

    this.builderBreakpoint = builderBreakpoint
    this.builderWidth = builderWidth
    this.id = id
    this.owner = owner
  }
}
