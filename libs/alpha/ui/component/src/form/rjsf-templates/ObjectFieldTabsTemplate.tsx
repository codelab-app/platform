/* Add 'ui:group' for uiSchema.
 * 'ui:group' is a custom option in uiSchema(https://react-jsonschema-form.readthedocs.io/en/latest/api-reference/uiSchema/) to specify rendering schema in groups.
 * Like all other options, it follows the form field hierarchy.
 * 1. 'ui:group' can be applied only to the 'object'-type
 * 2. 'ui:group' is an array. Items can be:
 * - string. Use to specify the order of fields
 * - group description. It's a map 'group' -> Array<fields in group> and special pair 'ui:temlate': <type of group visualization>. (currently implemented only 'tabs')
 * 3. All other fields will be placed on top
 *
 * Additional notes:
 * 1. 'field' can be specified in multiple groups (the input value will be in sync)
 * 2. To specify nested groups you can specify 'ui:groups' for sub-object
 */

import { Theme } from '@rjsf/antd'
import { ObjectFieldTemplateProps } from '@rjsf/core'
import { Tabs } from 'antd'
import React from 'react'

type GroupedField<T> = T extends object ? keyof T : string

type GroupDefinition<T = any> = {
  'ui:template': keyof typeof GroupTemplates
  groups: {
    [groupName: string]: Array<GroupedField<T>>
  }
}

export type GroupsDetails<T = any> = Array<GroupedField<T> | GroupDefinition<T>>

type TemplateProperties = {
  properties: Array<{
    name: string
    children: Array<React.ReactElement>
  }>
}

const GroupTemplates = {
  tabs: (props: TemplateProperties) => (
    <Tabs defaultActiveKey="0" key="tabs">
      {props.properties.map((p: any, idx: any) => (
        <Tabs.TabPane tab={p.name} key={p.name}>
          {p.children.map((c: React.ReactElement) => ({
            ...c,
            key: c.props.idSchema.$id,
          }))}
        </Tabs.TabPane>
      ))}
    </Tabs>
  ),
}

const DefaultTemplate = (props: TemplateProperties) => (
  <>{props.properties.map((p) => p.children)}</>
)

const renderNonGroupedProperties = ({
  props,
  groups,
}: {
  props: ObjectFieldTemplateProps
  groups: GroupsDetails
}) => {
  const { properties } = props
  const groupedProperties = groups.reduce(
    (acc: Array<string>, currGroup: GroupsDetails[number]) => {
      if (typeof currGroup === 'string') {
        return [...acc, currGroup]
      }

      if (typeof currGroup === 'object') {
        return [
          ...acc,
          ...Object.keys(currGroup.groups)
            .map((groupKey) => currGroup.groups[groupKey])
            .flat(),
        ] as Array<string>
      }

      return acc
    },
    [],
  )

  return properties
    .filter((p: any) => !groupedProperties.includes(p.name))
    .map((p: any) => p.content)
}

const renderGroupedProperties = ({
  props,
  groups,
}: {
  props: ObjectFieldTemplateProps
  groups: GroupsDetails
}) => {
  const { properties } = props

  if (!Array.isArray(groups)) {
    return properties.map((p) => p.content)
  }

  return groups
    .map((g) => {
      if (typeof g === 'string') {
        const found = properties.filter((p) => p.name === g)

        if (found.length === 1) {
          const el = found[0]

          return el.content
        }
      }

      if (typeof g === 'object') {
        const GroupComponent = GroupTemplates[g['ui:template']]
          ? GroupTemplates[g['ui:template']]
          : DefaultTemplate

        const _properties = Object.keys(g.groups).map((groupKey) => ({
          name: groupKey,
          children: g.groups[groupKey].reduce((acc, propertyName) => {
            const found = properties.find((p) => p.name === propertyName)

            return found ? [...acc, found.content] : acc
          }, [] as Array<React.ReactElement>),
        }))

        return <GroupComponent properties={_properties} key="GroupComponent" />
      }

      return null
    })
    .filter((el) => el !== null)
}

const GroupedTemplate = (props: ObjectFieldTemplateProps) => {
  const { TitleField, DescriptionField } = props

  console.log(props)

  return (
    <fieldset>
      {/* {(props.uiSchema['ui:title'] || props.title) && (
        <TitleField
          id={`${props.idSchema.$id}__title`}
          title={props.title || props.uiSchema['ui:title']}
          required={props.required}
          key={1}
        />
      )}
      {props.description && (
        <DescriptionField
          id={`${props.idSchema.$id}__description`}
          description={props.description}
          key={2}
        />
      )} */}
      {renderNonGroupedProperties({
        props,
        groups: props.uiSchema['ui:groups'],
      })}
      {renderGroupedProperties({
        props,
        groups: props.uiSchema['ui:groups'],
      })}
    </fieldset>
  )
}

export const ObjectFieldTabsTemplate = (props: ObjectFieldTemplateProps) => {
  const isGrouped = props.uiSchema['ui:groups'] !== undefined

  if (isGrouped) {
    return <GroupedTemplate {...props} />
  }

  return <Theme.ObjectFieldTemplate {...props} />
}
