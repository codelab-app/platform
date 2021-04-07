import React from 'react'
import { PageElementPropsForm } from '@codelab/modules/prop'

export const PaneConfigProps = ({
  pageElementId,
}: {
  pageElementId: string
}) => {
  return (
    <section style={{ height: '100%' }}>
      <PageElementPropsForm pageElementId={pageElementId} />

      {/* <h3>Vertex details</h3> */}
      {/*<Space>*/}
      {/*  <Button*/}
      {/*    type="primary"*/}
      {/*    onClick={() => setAddChildVertex({ visible: true })}*/}
      {/*  >*/}
      {/*    Add Child Node*/}
      {/*  </Button>*/}
      {/*  <DeleteVertexButton vertexId={vertex.id} />*/}
      {/*</Space>*/}
      {/*<Divider />*/}
      {/*<h3>Move Vertex</h3>*/}
      {/*<MoveVertexTargets sourceVertex={vertex} />*/}
      {/*<Divider />*/}
      {/*<AddChildVertexModal vertex={vertex} parentVertexId={vertex.id} />*/}
      {/*<UpdateVertexForm vertex={vertex} />*/}
    </section>
  )
}
