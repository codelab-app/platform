import React from 'react'
import { useRecoilState } from 'recoil'
import {
  AddChildVertexForm,
  AddChildVertexFormProps,
} from './AddChildVertexForm'
import { addChildVertexState } from './AddChildVertexState'
import { ModalForm } from '@codelab/frontend'

export const AddChildVertexModal = ({
  pageId,
  vertex,
  parentVertexId,
}: AddChildVertexFormProps) => {
  const [addChildVertex, setAddChildVertex] = useRecoilState(
    addChildVertexState,
  )

  return (
    <ModalForm
      modalProps={{
        okText: 'Add Child Vertex',
        okButtonProps: {},
        visible: addChildVertex.visible,
        onCancel: () => setAddChildVertex({ visible: false }),
        onOk: () => setAddChildVertex({ visible: false }),
      }}
      renderForm={() => (
        <AddChildVertexForm
          pageId={pageId}
          vertex={vertex}
          parentVertexId={parentVertexId}
        />
      )}
    />
  )
}
