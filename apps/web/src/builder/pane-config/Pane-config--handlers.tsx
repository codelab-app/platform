import { PaneConfigState } from './Pane-config'
import { UseOverlayToolbarFunctions } from '@codelab/frontend'
import { useUpdateVertexMutation } from '@codelab/generated'

export interface PaneConfigHandlersProps {
  setBuilderDrawer: (props: PaneConfigState) => void
  updateVertexMutation: ReturnType<typeof useUpdateVertexMutation>
  showHoverOverlay: UseOverlayToolbarFunctions['show']
  showClickOverlay: UseOverlayToolbarFunctions['show']
  resetHoverOverlay: UseOverlayToolbarFunctions['reset']
  resetClickOverlay: UseOverlayToolbarFunctions['reset']
}
