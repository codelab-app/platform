import {
  IAnyAction,
  IField,
  IPropsFieldContext,
} from '@codelab/shared/abstract/core'
import { toTitleCase } from '@codelab/shared/utils'
import Form from 'antd/lib/form'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Field } from './form-controls'

type PropsFieldFactoryProps = {
  field: IField
  form: UseFormReturn
  // the state object from where we will get the keys to make autocomplete options
  context?: IPropsFieldContext

  actionsList?: Array<IAnyAction>
}
/**
 * Creates a field for the props form given a specific type for the field
 */
export const PropsFields = observer<PropsFieldFactoryProps>(
  ({
    field,
    form,
    // the state object from where we will get the keys to make autocomplete options
    context,
    actionsList,
  }) => (
    <Form.Item label={field.name || toTitleCase(field.key)}>
      <Field
        actionsList={actionsList}
        context={context}
        field={field}
        form={form}
      />
    </Form.Item>
  ),
)
