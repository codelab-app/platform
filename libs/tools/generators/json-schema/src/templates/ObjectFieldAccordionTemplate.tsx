import { Theme } from '@rjsf/antd'
import { ObjectFieldTemplateProps } from '@rjsf/core'
import { Collapse } from 'antd'
import React from 'react'

type AccordionField<T> = T extends object ? keyof T : string

type AccordionDefinition<T = any> = {
  'ui:template': keyof typeof AccordionTemplates
  groups: {
    [groupName: string]: Array<AccordionField<T>>
  }
}

export type AccordionDetails<T = any> = Array<
  AccordionField<T> | AccordionDefinition<T>
>

type TemplateProperties = {
  properties: Array<{
    name: string
    children: Array<React.ReactElement>
  }>
}

const AccordionTemplates = {
  accordion: (props: TemplateProperties) => (
    <Collapse accordion>
      {props.properties.map((p: any, idx: any) => (
        <Collapse.Panel header={p.name} key={p.name}>
          {p.children.map((c: React.ReactElement) => ({
            ...c,
            key: c.props.idSchema.$id,
          }))}
        </Collapse.Panel>
      ))}
    </Collapse>
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
  groups: AccordionDetails
}) => {
  const { properties } = props
  const groupedProperties = groups.reduce(
    (acc: Array<string>, currGroup: AccordionDetails[number]) => {
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
  groups: AccordionDetails
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
        const GroupComponent = AccordionTemplates[g['ui:template']]
          ? AccordionTemplates[g['ui:template']]
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
        groups: props.uiSchema['ui:accordion'],
      })}
      {renderGroupedProperties({
        props,
        groups: props.uiSchema['ui:accordion'],
      })}
    </fieldset>
  )
}

export const ObjectFieldAccordionTemplate = (
  props: ObjectFieldTemplateProps,
) => {
  const isGrouped = props.uiSchema['ui:accordion'] !== undefined

  if (isGrouped) {
    return <GroupedTemplate {...props} />
  }

  return <Theme.ObjectFieldTemplate {...props} />
}
