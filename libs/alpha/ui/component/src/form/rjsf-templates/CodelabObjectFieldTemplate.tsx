import { ObjectFieldTemplateProps } from '@rjsf/core'
import { Collapse, Tabs } from 'antd'
import { chain, map } from 'lodash'
import React from 'react'

type UiSchemaKey = 'ui:tabs'

type UiSchemaItem<T> = { [K in UiSchemaKey]: T }

type UiSchemaCollection<T> = Array<UiSchemaItem<T>>

/**
 * We're basically transforming `UiSchemaValue` to `UiSchemaProperty`, by replacing fields
 */
type UiSchemaValue = {
  title: string
  fields: Array<string>
}

type UiSchemaProperty = {
  title: string
  objectFieldTemplateProperties: ObjectFieldTemplateProps['properties']
}

// Determines which object field type to use
export const ObjectFieldFactory = (
  props: UiSchemaItem<Array<UiSchemaProperty>>,
) => {
  return map(props, (uiSchemaProperties, uiSchemaKey): any => {
    if (uiSchemaKey === 'ui:tabs') {
      return (
        <Tabs defaultActiveKey="0" key="tabs">
          {uiSchemaProperties.map(
            ({ objectFieldTemplateProperties, title }) => {
              return (
                <Tabs.TabPane tab={title} key={title}>
                  {objectFieldTemplateProperties.map(({ content }) => {
                    return <>{content}</>
                  })}
                </Tabs.TabPane>
              )
            },
          )}
        </Tabs>
      )
    }

    if (uiSchemaKey === 'ui:accordion') {
      return (
        <Collapse accordion>
          {uiSchemaProperties.map(
            ({ objectFieldTemplateProperties, title }) => {
              return (
                <Collapse.Panel header={title} key={title}>
                  {objectFieldTemplateProperties.map(({ content }) => {
                    return <>{content}</>
                  })}
                </Collapse.Panel>
              )
            },
          )}
        </Collapse>
      )
    }

    return null
  })
}

export const CodelabObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
  const { uiSchema, properties } = props

  // Group by `ui:[schema]`
  const objectFieldProperties: UiSchemaCollection<
    Array<UiSchemaProperty>
  > = chain(uiSchema)
    // Filter `ui:[schema]` only
    .pickBy((val, key) => {
      return typeof key === 'string' && key.includes('ui:')
    })
    // Map field key to element
    .map<any>((uiSchemaVal: Array<UiSchemaValue>, uiSchemaKey: string) => {
      const mappedFields = uiSchemaVal.map(({ fields, title }) =>
        fields.reduce(
          (acc: any, field: any) => {
            const objectFieldTemplateProperty = properties.find(
              (p) => p.name === field,
            )

            return {
              ...acc,
              objectFieldTemplateProperties: [
                objectFieldTemplateProperty,
                ...acc.objectFieldTemplateProperties,
              ],
            }
          },
          { objectFieldTemplateProperties: [], title },
        ),
      )

      return {
        [uiSchemaKey]: mappedFields,
      }
    })
    .value()

  return (
    <div>
      {props.title}
      {props.description}
      {objectFieldProperties.map(ObjectFieldFactory)}
    </div>
  )
}
