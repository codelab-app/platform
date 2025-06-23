import type {
  IBreakpointType,
  IConfigPaneTab,
  IPreference,
  IPreferenceDto,
} from '@codelab/shared-abstract-core'

import { IModel } from '@codelab/shared-abstract-core'

export class Preference extends IModel implements IPreference {
  activeConfigPaneTab: IConfigPaneTab

  builderBreakpointType: IBreakpointType

  builderWidth: number

  id: string

  constructor({
    activeConfigPaneTab,
    builderBreakpointType,
    builderWidth,
    id,
  }: IPreferenceDto) {
    super()

    this.activeConfigPaneTab = activeConfigPaneTab
    this.builderBreakpointType = builderBreakpointType
    this.builderWidth = builderWidth
    this.id = id
  }
}
