import { Drawer } from 'antd'
import React from 'react'
import { atom, useRecoilState } from 'recoil'
import { GetVertexDetails } from '../../useCases/graph/getVertex/GetVertexDetails'

export interface BuilderDrawerState {
  visible: boolean
  vertexId?: string
}

export const builderDrawerState = atom<BuilderDrawerState>({
  key: 'builderDrawer',
  default: {
    visible: false,
    // vertexId: null,
  },
})

export const BuilderDrawer = () => {
  const [{ visible, vertexId }, setBuilderDrawer] = useRecoilState(
    builderDrawerState,
  )

  return (
    <Drawer
      width={600}
      title="Basic Drawer"
      placement="right"
      closable={false}
      onClose={() => setBuilderDrawer({ visible: false })}
      visible={visible}
    >
      {vertexId ? <GetVertexDetails vertexId={vertexId} /> : null}
    </Drawer>
  )
}
