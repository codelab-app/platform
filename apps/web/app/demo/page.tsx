/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useField } from 'uniforms'
import { AutoForm, SelectField, SubmitField } from 'uniforms-antd'
import { JSONSchemaBridge } from 'uniforms-bridge-json-schema'

const schema = {
  properties: {
    selection: {
      properties: {
        id: {
          label: 'Child Mapper Component',
          type: 'string',
        },
      },
      title: 'Select an option',
      type: 'object',
    },
  },
  type: 'object',
}

// Create bridge
const validator = () => {
  return null
}

const bridge = new JSONSchemaBridge(schema, validator)

const CustomSelectField = (props: any) => {
  const [fieldProps] = useField(
    props.name,
    {
      // value: 'option1',
    },
    { absoluteName: true, initialValue: false },
  )

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ]

  return (
    <SelectField
      {...fieldProps}
      onChange={(selectedId) => {
        fieldProps.onChange(selectedId)

        console.log('onChange', fieldProps.value)
      }}
      optionFilterProp="label"
      options={options}
      showSearch
    />
  )
}

const Page = () => {
  const model = {
    selection: {
      id: 'option2',
    },
  }

  return (
    <div>
      <h1>Demo Form</h1>
      <AutoForm
        model={model}
        onSubmit={(formModel) => console.log(formModel)}
        schema={bridge}
      >
        <CustomSelectField name="selection.id" />
        <SubmitField value="Submit" />
      </AutoForm>
    </div>
  )
}

export default Page
