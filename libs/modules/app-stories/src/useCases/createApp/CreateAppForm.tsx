import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { CreateAppInputSchema } from '../../../../app/src/core/application/useCases/createApp/CreateAppInput.generated'
import { useAppMachine } from '../../model/store/useAppMachine'

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
      schema={CreateAppInputSchema as JSONSchema7}
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
