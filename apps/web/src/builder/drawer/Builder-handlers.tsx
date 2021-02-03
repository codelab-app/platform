import { BuilderDrawerState } from './Builder-drawer'
import { useUpdateVertexMutation } from '@codelab/generated'

export interface BuilderHandlerProps {
  setBuilderDrawer: (props: BuilderDrawerState) => void
  updateVertexMutation: ReturnType<typeof useUpdateVertexMutation>
}
