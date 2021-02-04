import { PaneConfigState } from './Pane-config'
import { useUpdateVertexMutation } from '@codelab/generated'

export interface PaneConfigHandlersProps {
  setBuilderDrawer: (props: PaneConfigState) => void
  updateVertexMutation: ReturnType<typeof useUpdateVertexMutation>
}
