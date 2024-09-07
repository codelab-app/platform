import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { OwnerSchema } from '../user'
import { IBreakpointType } from './breakpoint-type.enum'

export const PreferenceDtoSchema = Type.Composite([
  /**
   * Owner required for composite key
   */
  OwnerSchema,
  Type.Object({
    builderBreakpointType: Type.Enum(IBreakpointType),
    builderWidth: Type.Number(),
    id: Type.String(),
  }),
])

export type IPreferenceDto = Static<typeof PreferenceDtoSchema>

export const PreferenceSchema = PreferenceDtoSchema

export type IPreference = Static<typeof PreferenceSchema>
