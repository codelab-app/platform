import React from 'react'
import XStateForm, {
  GeneratedXStateFormProps,
} from '../../../../../frontend/src/components/form/XStateForm'
import { CreateAppInput } from '../../../../app/src/core/application/useCases/createApp/CreateAppInput'
import { useAppMachine } from '../../model'
import { CreateAppInputSchema } from '@codelab/generated'

export type CreateAppFormProps = Omit<
  GeneratedXStateFormProps<CreateAppInput, any>,
  'schema' | 'rjsfFormProps' | 'send' | 'createSubmitEvent' | 'xStateOptions'
>

export const CreateAppForm = (props: CreateAppFormProps) => {
  const app = useAppMachine()

  return (
    <XStateForm<CreateAppInput, any>
      schema={CreateAppInputSchema}
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
