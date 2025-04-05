import type { Static } from '@sinclair/typebox'

import { Type } from '@sinclair/typebox'

import { IBreakpointType } from './breakpoint-type.enum'
import { IConfigPaneTab } from './config-pane-tab.enum'

export const PreferenceDtoSchema = Type.Object({
  activeConfigPaneTab: Type.Enum(IConfigPaneTab),
  builderBreakpointType: Type.Enum(IBreakpointType),
  builderWidth: Type.Number(),
  id: Type.String(),
})

export type IPreferenceDto = Static<typeof PreferenceDtoSchema>

export const PreferenceSchema = PreferenceDtoSchema

export type IPreference = Static<typeof PreferenceSchema>
