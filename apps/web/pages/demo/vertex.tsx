import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import { merge } from 'lodash'
import React from 'react'
import {
  ReactGridResponsiveLayoutSchema,
  UpdateVertexInputSchema,
} from '@codelab/generated'

const Form = withTheme(AntDTheme)

const VertexPage = () => {
  const schema = {
    ...merge(UpdateVertexInputSchema, {
      properties: {
        ...ReactGridResponsiveLayoutSchema.properties,
      },
    }),
  }

  return <Form schema={schema} />
}

export default VertexPage
