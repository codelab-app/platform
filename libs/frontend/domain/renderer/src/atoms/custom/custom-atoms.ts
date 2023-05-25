import type { IAtomRendererRecord } from '@codelab/frontend/abstract/core'
import { dynamicLoader } from '../dynamic-loader'

// Custom atom components
export const customAtoms: IAtomRendererRecord = {
  // @ts-expect-error: this is custom
  GoogleMapReact: dynamicLoader(() => window.externalComponents.GoogleMapReact),
  ReactCalendar: dynamicLoader(() => window.externalComponents.ReactCalendar),
}
