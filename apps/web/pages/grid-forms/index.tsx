import { Theme as AntDTheme } from '@rjsf/antd'
import { ObjectFieldTemplateProps, withTheme } from '@rjsf/core'
import { Col, Row } from 'antd'
import { ColProps } from 'antd/lib/col'
import { JSONSchema7 } from 'json-schema'
import React from 'react'

const Form = withTheme(AntDTheme)

interface GridCellDetails extends ColProps {
  order?: number
}

type ObjectFieldTemplateProperty = ObjectFieldTemplateProps['properties'][number] & {
  props: {
    schema: JSONSchema7
  }
  _grid: GridCellDetails
}

const GridFormsExamplePage = () => {
  const schema: JSONSchema7 = {
    title: 'Create User',
    type: 'object',
    properties: {
      email: {
        type: 'string',
        title: 'email_#1',
        $comment: '{"order":1, "span": 12}',
      },
      password: {
        type: 'string',
        title: 'password_#0',
        $comment: '{"order":0, "span": 16}',
      },
      name: {
        type: 'string',
        title: 'name_#2',
        $comment: '{"order":2, "span": 8}',
      },
      notGroupedField: {
        type: 'string',
        title: 'notGroupedField',
      },
    },
  }

  const extractGridDetailsFromPropertiesSchema = (
    property: ObjectFieldTemplateProperty,
  ): GridCellDetails => {
    let gridDetails

    try {
      gridDetails = JSON.parse(property.content.props.schema.$comment)
    } catch (e) {
      gridDetails = {}
    }

    return gridDetails
  }

  const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
    // split fields into grouped fields and others
    // sort grouped fields
    // render grouped fieds as grid
    // render all others fields

    const propertiesWithGridDetails = props.properties.map((p: any) => ({
      ...p,
      _grid: extractGridDetailsFromPropertiesSchema(p),
    }))

    const [properties, groupedProperties] = propertiesWithGridDetails.reduce(
      (acc: any, curr: ObjectFieldTemplateProperty) => {
        return curr._grid.order === undefined
          ? [[...acc[0], curr], acc[1]]
          : [acc[0], [...acc[1], curr]]
      },
      [[], []] as [
        Array<ObjectFieldTemplateProperty>,
        Array<ObjectFieldTemplateProperty>,
      ],
    )

    groupedProperties.sort(
      (a: ObjectFieldTemplateProperty, b: ObjectFieldTemplateProperty) =>
        (a._grid.order as number) - (b._grid.order as number),
    )

    return (
      <div>
        {props.title}
        {props.description}
        <Row>
          {groupedProperties.map((p: any) => {
            const { order, ...colProps } = p._grid

            return (
              <Col {...colProps} key={p.name}>
                {p.content}
              </Col>
            )
          })}
        </Row>
        {properties.map((p: any) => (
          <div className="property-wrapper" key={p.name}>
            {p.content}
          </div>
        ))}
      </div>
    )
  }

  const uiSchema = {
    'ui:ObjectFieldTemplate': ObjectFieldTemplate,
  }

  return <Form schema={schema} uiSchema={uiSchema} />
}

export default GridFormsExamplePage
