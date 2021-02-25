import React from 'react'
import { JsonSchemaForm } from '@codelab/frontend'
import {
  DemoGridPropsGridFormProps,
  DemoGridPropsSchema,
} from '@codelab/generated'
import { DemoGridProps } from 'libs/alpha/ui/antd/src/components/demo/Demo.input'

export const gridsFormProps = {
  schema: DemoGridPropsSchema,
}

export const GridsForm = () => {
  return (
    <JsonSchemaForm<DemoGridProps>
      {...gridsFormProps}
      {...DemoGridPropsGridFormProps}
    />
  )
}
