import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { BuilderDragData } from '../dnd/BuilderDragData'
import {
  builderSlice,
  BuilderTab,
  HoverElementActionPayload,
  PropsPerElementIdPayload,
  SelectElementActionPayload,
} from '../store'

const { actions } = builderSlice

export const useBuilderDispatch = () => {
  const dispatch = useDispatch()

  const selectElement = useCallback(
    (payload: SelectElementActionPayload) => {
      dispatch(actions.selectElement(payload))
    },
    [dispatch],
  )

  const hoverElement = useCallback(
    (payload: HoverElementActionPayload) => {
      dispatch(actions.hoverElement(payload))
    },
    [dispatch],
  )

  const resetSelection = useCallback(() => {
    dispatch(actions.resetSelection)
  }, [dispatch])

  const reset = useCallback(() => {
    dispatch(actions.reset())
  }, [dispatch])

  const setExtraPropsForElement = useCallback(
    (payload: PropsPerElementIdPayload) => {
      dispatch(actions.setExtraPropsForElement(payload))
    },
    [dispatch],
  )

  const setLastRenderedPropsForElement = useCallback(
    (payload: PropsPerElementIdPayload) => {
      dispatch(actions.setLastRenderedPropsForElement(payload))
    },
    [dispatch],
  )

  const setTab = useCallback(
    (payload: BuilderTab) => {
      dispatch(actions.setTab(payload))
    },
    [dispatch],
  )

  const setCurrentlyDragging = useCallback(
    (payload: BuilderDragData | undefined) => {
      dispatch(actions.setCurrentlyDragging(payload))
    },
    [dispatch],
  )

  return {
    selectElement,
    setCurrentlyDragging,
    setTab,
    setLastRenderedPropsForElement,
    setExtraPropsForElement,
    reset,
    resetSelection,
    hoverElement,
  }
}
