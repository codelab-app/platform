import React from 'react'
import { Spin } from 'antd'
import { Attribute_Bool_Exp } from '@codelab/hasura'
import {
  useGetAttributesQuery,
  usePageElementConfigQuery,
} from '@codelab/hasura'
import { createPropsFormSchema } from '@codelab/modules/prop'
import { JsonSchemaUniForm } from '@codelab/frontend/shared'

export const PaneConfigProps = ({
  pageElementId,
}: {
  pageElementId: string
}) => {
  const { data } = usePageElementConfigQuery({
    variables: {
      pageElementId,
    },
  })

  //We can just plug in here an attribute filtering system in the future
  const attributeSearchValue = ''

  const where: Attribute_Bool_Exp = {}

  if (attributeSearchValue) {
    where.key = { _ilike: `%${attributeSearchValue}%` }
  }

  const { data: attributes, loading } = useGetAttributesQuery({
    variables: {
      where,
    },
  })

  const propsFormSchema = createPropsFormSchema(attributes?.attribute as any)

  return (
    <section>
      {loading ? (
        <Spin />
      ) : (
        <JsonSchemaUniForm schema={propsFormSchema} onSubmit={console.log} />
      )}

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
