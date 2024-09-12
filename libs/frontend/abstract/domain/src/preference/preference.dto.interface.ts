import type { IPreference, IRef } from '@codelab/shared/abstract/core'

export type IUpdatePreferenceData = IRef &
  Partial<Pick<IPreference, 'builderBreakpointType' | 'builderWidth'>>
