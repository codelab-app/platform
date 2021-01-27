import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { ApolloForm } from '../../../../../libs/frontend/src/components/form/ApolloForm'
import { useCreatePageMutation } from '../../../../../libs/modules/page/src/core/application/useCases/createPage/CreatePage.generated'
import { CreatePageMutationVariables } from '../../../../../types/types.generated'
import { CreatePageInput } from 'libs/modules/page/src/core/application/useCases/createPage/CreatePageInput'
import { CreatePageInputSchema } from 'libs/modules/page/src/core/application/useCases/createPage/CreatePageInput.generated'

export const CreatePageForm = () => {
  return (
    <ApolloForm<CreatePageInput, CreatePageMutationVariables>
      useMutation={useCreatePageMutation}
      schema={CreatePageInputSchema as JSONSchema7}
      rjsfFormProps={{
        uiSchema: {},
      }}
      formData={{ title: '', appId: '' }}
    />
  )
}
