import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import React from 'react'
import { UpdateVertexInputSchema } from '@codelab/generated'

const Form = withTheme(AntDTheme)

const VertexPage = () => {
  return <Form schema={UpdateVertexInputSchema} />
}

export default VertexPage
