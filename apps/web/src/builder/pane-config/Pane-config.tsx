import React from 'react'
import { atom, useRecoilState } from 'recoil'
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

  return <>{vertexId ? <GetVertexDetails vertexId={vertexId} /> : null}</>
}
