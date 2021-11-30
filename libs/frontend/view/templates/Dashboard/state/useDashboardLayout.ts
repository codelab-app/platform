import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  dashboardLayoutSlice,
  DashboardLayoutState,
} from './dashboardLayoutSlice'

export interface UseDashboardLayout extends DashboardLayoutState {
  openMetaPane: () => void
  closeMetaPane: () => void
  toggleMetaPane: () => void
  metaPaneIsOpen: boolean
}

export const useDashboardLayout = (): UseDashboardLayout => {
  const state = useSelector((s) => s.dashboardLayout)
  const dispatch = useDispatch()

  const openMetaPane = useCallback(() => {
    dispatch(dashboardLayoutSlice.actions.setMetaPaneOpen(true))
  }, [dispatch])

  const closeMetaPane = useCallback(() => {
    dispatch(dashboardLayoutSlice.actions.setMetaPaneOpen(false))
  }, [dispatch])

  const toggleMetaPane = useCallback(() => {
    dispatch(dashboardLayoutSlice.actions.toggleMetaPane())
  }, [dispatch])

  return {
    metaPaneIsOpen: state.metaPaneIsOpen,
    openMetaPane,
    closeMetaPane,
    toggleMetaPane,
  }
}
