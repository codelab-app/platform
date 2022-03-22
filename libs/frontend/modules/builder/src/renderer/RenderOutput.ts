import {
  AtomType,
  PropsData,
  PropsDataByElementId,
} from '@codelab/shared/abstract/core'

/**
 * This is the raw output from rendering a single Element
 */
export interface RenderOutput {
  /** This is the id of the element which this RenderOutput was rendered from */
  elementId: string
  atomType: AtomType
  props: PropsData
  /** Props that will be passed to descendants, by element id */
  descendantPropBindings?: PropsDataByElementId
}
