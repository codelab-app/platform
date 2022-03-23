import { IElement } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { builderSelectors } from '../store'
import { useBuilderDispatch } from './useBuilderDispatch'

export interface UseBuilderHoveringElement {
  hoveringElement: Maybe<IElement>
  hoveringElementId: Maybe<string>
  setHoveringElement: (elementId?: string) => void
  resetSelection: () => void
}

export const useBuilderHoveringElement = (): UseBuilderHoveringElement => {
  const hoveringElementId = useSelector(builderSelectors.hoveringElementId)
  const { hoverElement, resetSelection } = useBuilderDispatch()
  // const { elementTree } = useElementGraphContext()

  const setHoveringElement = useCallback(
    (elementId?: string) => hoverElement({ elementId }),
    [hoverElement],
  )

  return {
    hoveringElement: undefined,
    // hoveringElement: hoveringElementId
    //   ? elementTree.getVertex(hoveringElementId)
    //   : undefined,
    hoveringElementId,
    resetSelection,
    setHoveringElement,
  }
}
