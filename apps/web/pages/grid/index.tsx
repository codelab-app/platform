import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import React from 'react'
import {
  DemoGridFormInputFormProps,
  DemoGridFormInputSchema,
} from '@codelab/generated'

const Form = withTheme(AntDTheme)

const GridDemoPage = () => {
  return (
    <Form schema={DemoGridFormInputSchema} {...DemoGridFormInputFormProps} />
  )
}

export default GridDemoPage
