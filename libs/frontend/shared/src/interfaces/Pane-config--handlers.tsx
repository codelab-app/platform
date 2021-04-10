import {
  AddChildVertexInput,
  useUpdateVertexMutation,
} from '@codelab/generated'
import { PaneConfigState } from '../state'

type UseOverlayToolbarFunctions = any

export interface PaneConfigHandlersProps {
  setPaneConfig: (props: PaneConfigState) => void
  updateVertexMutation: ReturnType<typeof useUpdateVertexMutation>
  showHoverOverlay: UseOverlayToolbarFunctions['show']
  showClickOverlay: UseOverlayToolbarFunctions['show']
  resetHoverOverlay: UseOverlayToolbarFunctions['reset']
  resetClickOverlay: UseOverlayToolbarFunctions['reset']
  addChildVertex: (input: AddChildVertexInput) => any
}
