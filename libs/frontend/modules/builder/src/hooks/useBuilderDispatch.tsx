import { useDispatch } from 'react-redux'
import { BuilderDragData } from '../dnd/BuilderDragData'
import {
  builderSlice,
  BuilderTab,
  HoverElementActionPayload,
  PropsPerElementIdPayload,
  SelectElementActionPayload,
} from '../store'

export const useBuilderDispatch = () => {
  const dispatch = useDispatch()
  const { actions } = builderSlice

  const selectElement = (payload: SelectElementActionPayload) => {
    dispatch(actions.selectElement(payload))
  }

  const hoverElement = (payload: HoverElementActionPayload) => {
    dispatch(actions.hoverElement(payload))
  }

  const resetSelection = () => {
    dispatch(actions.resetSelection)
  }

  const reset = () => {
    dispatch(actions.reset())
  }

  const setExtraPropsForElement = (payload: PropsPerElementIdPayload) => {
    dispatch(actions.setExtraPropsForElement(payload))
  }

  const setLastRenderedPropsForElement = (
    payload: PropsPerElementIdPayload,
  ) => {
    dispatch(actions.setLastRenderedPropsForElement(payload))
  }

  const setTab = (payload: BuilderTab) => {
    dispatch(actions.setTab(payload))
  }

  const setCurrentlyDragging = (payload: BuilderDragData | undefined) => {
    dispatch(actions.setCurrentlyDragging(payload))
  }

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
