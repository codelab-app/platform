import { Theme as AntDTheme } from '@rjsf/antd'
import { ObjectFieldTemplateProps, withTheme } from '@rjsf/core'
import { Col, Row } from 'antd'
import { ColProps } from 'antd/lib/col'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { IDecoratorMap } from '@codelab/tools/grid-decorator'

const Form = withTheme(AntDTheme)

interface GridCellDetails extends ColProps {
  order?: number
}

const parseIdSchema = (idSchema: string): Array<string> => {
  return idSchema.split('_')
}

type ObjectFieldTemplateProperty = ObjectFieldTemplateProps['properties'][number] & {
  props: {
    schema: JSONSchema7
  }
  _grid: GridCellDetails
}

export const gridFormFactory = (
  schema: JSONSchema7,
  decoratorSettings: IDecoratorMap | undefined = undefined,
) => {
  const extractGridDetailsFromPropertiesSchema = (
    p: ObjectFieldTemplateProps['properties'][number],
  ): GridCellDetails => {
    const emptyGridDetails = {}

    if (decoratorSettings === undefined) {
      return emptyGridDetails
    }

    const propIdSchema = p.content.props.idSchema.$id

    // we cut the first step (='root') because it is special mark for internal needs of rjsf
    const pathStepsToDecoratoraDetails = parseIdSchema(propIdSchema).slice(1)
    const pathStepsToGridDecorator = [...pathStepsToDecoratoraDetails, 'grid']
    let subtree: any = decoratorSettings

    for (const fieldName of pathStepsToGridDecorator) {
      subtree = subtree[fieldName]
      if (subtree === undefined) {
        return emptyGridDetails
      }
    }

    return Array.isArray(subtree) ? subtree[0] : emptyGridDetails
  }

  const ObjectFieldTemplate = (props: ObjectFieldTemplateProps) => {
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

  return <Form schema={schema} ObjectFieldTemplate={ObjectFieldTemplate} />
}
