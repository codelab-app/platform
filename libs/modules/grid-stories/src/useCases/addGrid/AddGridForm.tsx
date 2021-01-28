import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import { Button } from 'antd'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { AddGridInput } from './AddGridInput'
import { AddGridInputSchema } from '@codelab/generated'

const Form = withTheme(AntDTheme)

export const AddGridForm = () => {
  const [formData, setFormData] = useState<AddGridInput>({
    i: uuidv4(),
    x: 0,
    y: 0,
    w: 2,
    h: 2,
  })

  return (
    <Form
      schema={AddGridInputSchema}
      uiSchema={{
        password: {
          'ui:widget': 'password',
        },
      }}
      formData={formData}
      onChange={(e) => setFormData(e.formData)}
      onSubmit={(values) => {
        console.log(values.formData)
      }}
    >
      <Button htmlType="submit" type="primary">
        Submit
      </Button>
    </Form>
  )
}
