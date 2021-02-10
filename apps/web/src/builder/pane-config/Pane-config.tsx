import React, { useRef } from 'react'
import { atom, useRecoilState } from 'recoil'
import useOnClickOutside from '../../../../../libs/frontend/src/utils/useOnClickOutside'
import { GetVertexDetails } from '../../useCases/graph/getVertex/GetVertexDetails'

export interface PaneConfigState {
  visible: boolean
  vertexId?: string
}

export const paneConfigState = atom<PaneConfigState>({
  key: 'paneConfig',
  default: {
    visible: false,
    // vertexId: null,
  },
})

export const PaneConfig = () => {
  const [{ vertexId }, setPaneConfig] = useRecoilState(paneConfigState)

  const ref = useRef<HTMLDivElement>(null)

  // "Deselect" the current vertex when we click outside the pane
  useOnClickOutside(
    ref,
    () => {
      setPaneConfig({
        vertexId: undefined,
        visible: false,
      })
    },
    [setPaneConfig],
  )

  return (
    <>
      {vertexId ? (
        <div ref={ref}>
          <GetVertexDetails vertexId={vertexId} />
        </div>
      ) : null}
    </>
  )
}
