import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import React from 'react'
import { DemoTabsPropsFormProps, DemoTabsPropsSchema } from '@codelab/generated'

const Form = withTheme(AntDTheme)

const Tabs = () => {
  return <Form schema={DemoTabsPropsSchema} {...DemoTabsPropsFormProps} />
}

export default Tabs
