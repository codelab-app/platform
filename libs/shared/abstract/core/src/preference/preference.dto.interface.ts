import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { OwnerSchema } from '../user'
import { IBreakpoint } from './breakpoint.enum'

export const PreferenceDtoSchema = Type.Composite([
  /**
   * Owner required for composite key
   */
  OwnerSchema,
  Type.Object({
    builderBreakpoint: Type.Enum(IBreakpoint),
    builderWidth: Type.Number(),
    id: Type.String(),
  }),
])

export type IPreferenceDto = Static<typeof PreferenceDtoSchema>

export const PreferenceSchema = PreferenceDtoSchema

export type IPreference = Static<typeof PreferenceSchema>
