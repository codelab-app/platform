import { Tabs } from 'antd'
import React, { Fragment } from 'react'

export interface ITabs {
  panelTitle: string
  fields: Array<string>
}

export const RjsfTabsFieldTemplate = (props: any) => {
  const {
    TitleField,
    DescriptionField,
    uiSchema,
    // idSchema,
    // required,
    // disabled,
    // readonly,
    // formData,
    // formContext,
    properties,
    schema,
  } = props

  const findContent = (name: string) => {
    return properties.find((prop: any) => {
      return prop.name === name
    })
  }

  const layout: Array<ITabs> = uiSchema['ui:groups']

  return (
    <fieldset id={props.idSchema.$id}>
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
      <Tabs defaultActiveKey="0" key="tabs">
        {layout?.map((row, index) => {
          return (
            <Tabs.TabPane tab={row.panelTitle} key={index}>
              {row.fields.map((field: string) => {
                if (schema.properties[field]) {
                  const element = findContent(field)

                  return <div>{element.content}</div>
                }

                return <Fragment key="any" />
              })}
            </Tabs.TabPane>
          )
        })}
      </Tabs>
    </fieldset>
  )
}
