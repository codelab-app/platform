import { JSONSchema7 } from 'json-schema'
import React from 'react'
import XStateForm, {
  GeneratedXStateFormProps,
} from '../../../../../frontend/src/components/form/XStateForm'
import { useAppMachine } from '../../model'
import { UpdateAppInputSchema } from 'libs/modules/app/src/core/application/useCases/updateApp'

export type EditAppFormProps = Omit<
  GeneratedXStateFormProps<any, any>,
  'schema' | 'rjsfFormProps' | 'send' | 'createSubmitEvent' | 'xStateOptions'
>

export const EditAppForm = (props: EditAppFormProps) => {
  const app = useAppMachine()

  return (
    <XStateForm<any, any>
      schema={UpdateAppInputSchema as JSONSchema7}
      send={app.send}
      createSubmitEvent={({ data }) => {
        return {
          type: 'ON_SUBMIT',
          data,
        }
      }}
      rjsfFormProps={{
        uiSchema: {
          id: {
            'ui:widget': 'hidden',
          },
        },
      }}
      xStateOptions={{
        createChangeEvent: ({ data }) => {
          return {
            type: 'ON_FORM_DATA_CHANGE',
            data,
          }
        },
        state: app.state,
        contextKey: 'formData',
        storeStateInXState: true,
      }}
      {...props}
    />
  )
}
