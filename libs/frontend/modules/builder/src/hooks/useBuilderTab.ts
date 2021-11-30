import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { builderActions, BuilderTab } from '../store'

export const useBuilderTab = () => {
  const dispatch = useDispatch()
  const builderTab = useSelector((s) => s.builder.tab)

  const setBuilderTab = useCallback(
    (tab: BuilderTab) => {
      dispatch(builderActions.setTab(tab))
    },
    [dispatch],
  )

  return { builderTab, setBuilderTab }
}
