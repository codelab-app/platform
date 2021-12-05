import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { BuilderTab } from '../store'
import { useBuilderDispatch } from './useBuilderDispatch'

export const useBuilderTab = () => {
  const { setTab } = useBuilderDispatch()
  const builderTab = useSelector((s) => s.builder.tab)

  const setBuilderTab = useCallback(
    (tab: BuilderTab) => {
      setTab(tab)
    },
    [setTab],
  )

  return { builderTab, setBuilderTab }
}
