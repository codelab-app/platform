import { Col, Row } from 'antd'
import React from 'react'
/* eslint-disable react/no-array-index-key */

export const ObjectGridTemplate = (props: any) => {
  const {
    TitleField,
    DescriptionField,
    uiSchema,
    idSchema,
    required,
    disabled,
    readonly,
    formData,
    formContext,
    properties,
    schema,
  } = props

  const filterHidden = (element: any) =>
    element.content.props.uiSchema['ui:widget'] !== 'hidden'

  const findContent = (name: string) => {
    return properties.find((prop: any) => {
      return prop.name === name
    })
  }

  const layout = uiSchema['ui:layout']
  const gutter = uiSchema['ui:spacing']

  const fieldsetStyle = {
    border: '1px solid black',
    'border-radius': '5px',
    margin: '10px',
  }

  const rowStyle = {
    margin: '15px',
  }

  return (
    <fieldset style={fieldsetStyle} id={props.idSchema.$id}>
      {(props.uiSchema['ui:title'] || props.title) && (
        <TitleField
          id={`${props.idSchema.$id}__title`}
          title={props.title || props.uiSchema['ui:title']}
          required={props.required}
          formContext={props.formContext}
        />
      )}
      {props.description && (
        <DescriptionField
          id={`${props.idSchema.$id}__description`}
          description={props.description}
          formContext={props.formContext}
        />
      )}
      {layout?.map((row: any, index: number) => {
        const rowKeys = Object.keys(row)

        if (row['ui:order'] && row['ui:order'].length > 0) {
          const orderedKeys = row['ui:order']

          return (
            <div style={rowStyle} key={index}>
              <Row gutter={gutter}>
                {orderedKeys.map((name: string) => {
                  if (schema.properties[name]) {
                    const content = findContent(name)

                    return <Col span={row[name].span}>{content.content}</Col>
                  }

                  return null
                })}
              </Row>
            </div>
          )
        }

        return (
          <div style={rowStyle} key={index}>
            <Row gutter={gutter}>
              {rowKeys.map((name) => {
                if (schema.properties[name]) {
                  const element = findContent(name)

                  return <Col span={row[name].span}>{element.content}</Col>
                }

                return null
              })}
            </Row>
          </div>
        )
      })}
    </fieldset>
  )
}
