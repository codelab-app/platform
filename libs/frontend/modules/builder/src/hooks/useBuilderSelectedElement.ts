import {
  ElementFragment,
  useGetElementQuery,
} from '@codelab/frontend/modules/element'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { builderActions, builderSelectors } from '../store'

export interface UseBuilderSelectedElement {
  selectedElement: ElementFragment | null
  selectedElementId: string | undefined
  isLoading: boolean
  setSelectedElement: (elementId?: string) => void
  resetSelection: () => void
}

export const useBuilderSelectedElement = (): UseBuilderSelectedElement => {
  const selectedElementId = useSelector(builderSelectors.selectedElementId)
  const dispatch = useDispatch()

  const setSelectedElement = useCallback(
    (elementId?: string) =>
      dispatch(builderActions.selectElement({ elementId })),
    [dispatch],
  )

  const resetSelection = useCallback(
    () => dispatch(builderActions.resetSelection),
    [dispatch],
  )

  const state = useGetElementQuery(
    { variables: { input: { where: { id: selectedElementId } } } },
    {
      skip: !selectedElementId,
      selectFromResult: (r) => ({
        selectedElement: r.data?.getElement ?? null,
        isLoading: r.isLoading,
        selectedElementId,
      }),
    },
  )

  return {
    ...state,
    setSelectedElement,
    resetSelection,
  }
}
