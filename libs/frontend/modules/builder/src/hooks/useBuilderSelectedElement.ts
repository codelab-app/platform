import { IElement } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { builderSelectors } from '../store'
import { useBuilderDispatch } from './useBuilderDispatch'

export interface UseBuilderSelectedElement {
  selectedElement: Maybe<IElement>
  selectedElementId: Maybe<string>
  setSelectedElement: (elementId?: string) => void
  resetSelection: () => void
}

export const useBuilderSelectedElement = (): UseBuilderSelectedElement => {
  const selectedElementId = useSelector(builderSelectors.selectedElementId)
  // const { elementTree } = useElementGraphContext()
  const { selectElement, resetSelection } = useBuilderDispatch()

  const setSelectedElement = useCallback(
    (elementId?: string) => selectElement({ elementId }),
    [selectElement],
  )

  return {
    selectedElement: undefined,
    // selectedElementId
    //   ? elementTree.getVertex(selectedElementId)
    //   : undefined,
    selectedElementId,
    setSelectedElement,
    resetSelection,
  }
}
