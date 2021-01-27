import { JSONSchema7 } from 'json-schema'
import React, { useState } from 'react'
import { JsonSchemaForm } from '@codelab/frontend'
import { CreatePageInput } from 'libs/modules/page/src/core/application/useCases/createPage/CreatePageInput'
import { CreatePageInputSchema } from 'libs/modules/page/src/core/application/useCases/createPage/CreatePageInput.generated'

export const CreatePageForm = () => {
  const [formData, setFormData] = useState<CreatePageInput>({
    title: '',
    appId: '',
  })

  return (
    <JsonSchemaForm<CreatePageInput>
      schema={CreatePageInputSchema as JSONSchema7}
      rjsfFormProps={{
        uiSchema: {},
      }}
      formData={formData}
      onChange={({ data }) => setFormData(data)}
      onSubmit={(v) => {
        console.log(v)
      }}
    />
  )
}
