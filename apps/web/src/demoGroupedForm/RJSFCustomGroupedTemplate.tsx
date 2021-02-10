import { Theme } from '@rjsf/antd'
import { ObjectFieldTemplateProps } from '@rjsf/core'
import React from 'react'
import { GroupTemplates, GroupTypes } from './GroupedTemplates'

interface UiTemplateKey {
  'ui:template': GroupTypes
}
interface GroupsItems {
  [groupName: string]: Array<string>
}
type SingleItemGroup = string
type GroupDefinition = UiTemplateKey & GroupsItems

export type Groups = Array<SingleItemGroup | GroupDefinition>

export type TemplateProperties = {
  properties: Array<{
    name: string
    children: Array<React.ReactElement>
  }>
}

const DefaultTemplate = (props: TemplateProperties) => (
  <>{props.properties.map((p) => p.children)}</>
)

const renderNonGroupedProperties = ({
  props,
  groups,
}: {
  props: ObjectFieldTemplateProps
  groups: Groups
}) => {
  const { properties } = props
  const groupedProperties = groups.reduce(
    (acc: Array<string>, currGroup: Groups[number]) => {
      if (typeof currGroup === 'string') {
        return [...acc, currGroup]
      }

      if (typeof currGroup === 'object') {
        return [
          ...acc,
          ...Object.keys(currGroup)
            .filter((groupKey) => !groupKey.startsWith('ui:'))
            .map((groupKey) => currGroup[groupKey])
            .flat(),
        ]
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
  groups: Groups
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

        const _properties = Object.keys(g as GroupDefinition)
          .filter((groupKey) => !groupKey.startsWith('ui:'))
          .map((groupKey) => ({
            name: groupKey,
            children: g[groupKey].reduce((acc, propertyName) => {
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

  return (
    <fieldset>
      {(props.uiSchema['ui:title'] || props.title) && (
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
      )}
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

export const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
  const isGrouped = props.uiSchema['ui:groups'] !== undefined

  if (isGrouped) {
    return <GroupedTemplate {...props} />
  }

  return <Theme.ObjectFieldTemplate {...props} />
}
