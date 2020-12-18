import { Theme as AntDTheme } from '@rjsf/antd'
import { withTheme } from '@rjsf/core'
import { Button, Select } from 'antd'
import { JSONSchema7 } from 'json-schema'
import React, { useState } from 'react'
import buttonsPropsSchema from './json-schemas/buttonPropsSchema.json'
import { VertexType } from '@codelab/alpha/shared/interface/graph'

const { Option } = Select
const Form = withTheme(AntDTheme)

// Object version
// Solution:
// 1. use object for props
// 2. use custom template for object
// 2.1. 'required" should be shown immediately
// 2.2. all other should be availiable by "add" with select (choose option) -> specify property
export const FormVertex = () => {
  /* It's important to place the definition in the root.
   * Otherwise, we'll need to change dependencies everywhere (it'll be a solution if we meet Symbol conflicts) */

  const {
    definitions: buttonsDefinitions,
    ...buttonsProps
  } = buttonsPropsSchema
  const schema: JSONSchema7 = {
    title: 'Vertex',
    type: 'object',
    required: ['type'],
    definitions: {
      ...buttonsDefinitions,
    } as any,
    properties: {
      type: {
        type: 'string',
        title: 'Type',
        enum: Object.keys(VertexType),
      },
    },
    dependencies: {
      type: {
        oneOf: [
          {
            properties: {
              type: {
                enum: [VertexType.REACT_BUTTON],
              },
              props: {
                title: 'Props',
                ...(buttonsProps as any),
              },
            },
          },
        ],
      },
    },
  }

  const log = (type: any) => console.log.bind(console, type)

  const ObjectFieldTemplate = (props: any) => {
    const [addedProps, setAddedProps] = useState<Array<string>>([])
    const [propCandidate, setPropCandidate] = useState<null | string>(null)

    const handleAddProp = () => {
      if (propCandidate !== null) {
        setAddedProps([...addedProps, propCandidate])
      }
    }

    const formDataPropsKeys = Object.keys(props.formData).filter(
      (formItemKey) => {
        const formItem = props.formData[formItemKey]

        if (typeof formItem === 'object') {
          return Object.values(formItem).length > 0
        }

        if (Array.isArray(formItem)) {
          return formItem.length > 0
        }

        return formItem !== undefined
      },
    )

    const requiredProps = props.schema.required ? props.schema.required : []
    const shownProperties = [
      ...requiredProps,
      ...formDataPropsKeys,
      ...addedProps,
    ]
    const availableToAddProperties = Object.keys(
      props.schema.properties,
    ).filter((p: any) => !shownProperties.includes(p))

    return (
      <div>
        {props.title}
        {props.description}
        {props.properties
          .filter((element: any) => shownProperties.includes(element.name))
          .map((element: any) => (
            <div className="property-wrapper">{element.content}</div>
          ))}
        <Button onClick={() => handleAddProp()}>Add prop</Button>
        <Select onChange={(value: string) => setPropCandidate(value)}>
          {availableToAddProperties.map((propertyName: string) => (
            <Option value={propertyName}>{propertyName}</Option>
          ))}
        </Select>
      </div>
    )
  }

  const uiSchema = {
    props: {
      'ui:ObjectFieldTemplate': ObjectFieldTemplate,
    },
  }

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      onSubmit={log('submitted')}
      onError={log('errors')}
    />
  )
}
