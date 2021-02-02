import { DashboardDrawerState } from './Dashboard-drawer'
import { useUpdateVertexMutation } from '@codelab/generated'

export interface DashboardHandlerProps {
  setDashboardDrawer: (props: DashboardDrawerState) => void
  updateVertexMutation: ReturnType<typeof useUpdateVertexMutation>
}
