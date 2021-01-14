import { JSONSchema7 } from 'json-schema'
import React from 'react'
import GeneratedXStateForm, {
  GeneratedXStateFormProps,
} from '../../../../../frontend/src/components/generated-form/GeneratedXStateForm'
import { CreateAppInputSchema } from '../../../../app/src/core/application/useCases/createApp/CreateAppInput.generated'
import { LoginUserInput } from '../../../../user/src/core/application/useCases/loginUser/LoginUserInput'
import { useAppMachine } from '../../model'

export type CreateAppFormProps = Omit<
  GeneratedXStateFormProps<LoginUserInput, any>,
  'schema' | 'rjsfFormProps' | 'send' | 'createSubmitEvent'
>

export const CreateAppForm = (props: CreateAppFormProps) => {
  const app = useAppMachine()

  return (
    <GeneratedXStateForm<LoginUserInput, any>
      schema={CreateAppInputSchema as JSONSchema7}
      send={app.send}
      createSubmitEvent={({ data }) => {
        return {
          type: 'ON_SUBMIT',
          data,
        }
      }}
      {...props}
    />
  )
}
