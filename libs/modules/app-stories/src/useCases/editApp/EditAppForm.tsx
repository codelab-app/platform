import { JSONSchema7 } from 'json-schema'
import React from 'react'
import GeneratedXStateForm, {
  GeneratedXStateFormProps,
} from '../../../../../frontend/src/components/generated-form/GeneratedXStateForm'
import { useAppMachine } from '../../model'
import { CreateAppInputSchema } from 'libs/modules/app/src/core/application/useCases/createApp/CreateAppInput.generated'

export type EditAppFormProps = Omit<
  GeneratedXStateFormProps<any, any>,
  'schema' | 'rjsfFormProps' | 'send' | 'createSubmitEvent' | 'xStateOptions'
>

export const EditAppForm = (props: EditAppFormProps) => {
  const app = useAppMachine()

  return (
    <GeneratedXStateForm<any, any>
      // TODO: change this to EditAppInputSchema when it's ready
      schema={CreateAppInputSchema as JSONSchema7}
      send={app.send}
      createSubmitEvent={({ data }) => {
        return {
          type: 'ON_SUBMIT',
          data,
        }
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
