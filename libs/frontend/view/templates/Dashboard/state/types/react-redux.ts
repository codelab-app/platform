import { DashboardLayoutState } from '../dashboardLayoutSlice'

declare module 'react-redux' {
  interface DefaultRootState {
    dashboardLayout: DashboardLayoutState
  }
}
