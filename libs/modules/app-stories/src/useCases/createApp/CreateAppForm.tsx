import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import { JSONSchema7 } from 'json-schema'
import { omit } from 'lodash'
import React from 'react'
import { useAppMachine } from '../../model/store/useAppMachine'
import { requestJsonSchema } from '@codelab/tools/generators/json-schema'

export const CreateAppForm = ({ formId }: { formId?: string }) => {
  const app = useAppMachine()

  const onSubmit = ({ formData }: any) => {
    app.send({
      type: 'ON_SUBMIT',
      data: formData,
    })
  }

  const Form = withTheme(AntDTheme)

  return (
    <Form
      id={formId}
      schema={omit(
        requestJsonSchema.definitions.CreateAppRequest as JSONSchema7,
        'properties.userId',
      )}
      uiSchema={
        {
          // password: {
          //   'ui:widget': 'password',
          // },
        }
      }
      // widgets={widgets}
      // formContext={formCtx}
      // onChange={filterOptions}
      onSubmit={onSubmit}
      // onError={log('errors')}
    />
  )
}
