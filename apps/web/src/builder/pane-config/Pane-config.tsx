import React from 'react'
import { atom, useRecoilState } from 'recoil'
import { GetVertexDetails } from '../../useCases/graph/getVertex/GetVertexDetails'

export interface PaneConfigState {
  visible: boolean
  vertexId?: string
}

export const paneConfigState = atom<PaneConfigState>({
  key: 'builderDrawer',
  default: {
    visible: false,
    // vertexId: null,
  },
})

export const PaneConfig = () => {
  const [{ visible, vertexId }, setBuilderDrawer] = useRecoilState(
    paneConfigState,
  )

  return <>{vertexId ? <GetVertexDetails vertexId={vertexId} /> : null}</>
  // return (
  //   <Drawer
  //     width={600}
  //     title="Basic Drawer"
  //     placement="right"
  //     closable={false}
  //     onClose={() => setBuilderDrawer({ visible: false })}
  //     visible={visible}
  //   >
  //     {vertexId ? <GetVertexDetails vertexId={vertexId} /> : null}
  //   </Drawer>
  // )
}
