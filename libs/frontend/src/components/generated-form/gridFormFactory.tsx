import { Theme as AntDTheme } from '@rjsf/antd'
import { ObjectFieldTemplateProps, withTheme } from '@rjsf/core'
import { Col, Row } from 'antd'
import { ColProps } from 'antd/lib/col'
import { JSONSchema7 } from 'json-schema'
import React from 'react'
import { IDecoratorsMap } from '@codelab/tools/grid-decorator'

interface GridCellDetails extends ColProps {
  order?: number
}
type ObjectFieldTemplateProperty = ObjectFieldTemplateProps['properties'][number]
type Path = Array<string>

const getIdSchema = (p: ObjectFieldTemplateProperty): string => {
  return p.content.props.idSchema.$id
}

const parseIdSchema = (idSchema: string, separator = '_'): Array<string> => {
  return idSchema.split(separator)
}

const generatePathToGridDetailsByIdSchema = (
  idSchema: string,
): Array<string> => {
  const gridFieldName = 'grid'

  // we cut the first step (='root') because it is special mark for internal needs of rjsf
  const pathSteps = parseIdSchema(idSchema).slice(1)

  return [...pathSteps, gridFieldName]
}

const getFieldByPath = (obj: {}, path: Path): any | null => {
  if (obj === undefined) {
    return null
  }

  let subtree: any = obj

  for (const fieldName of path) {
    subtree = subtree[fieldName]
    if (subtree === undefined) {
      return null
    }
  }

  return subtree
}

const getGridDetailsFromPropertiesSchema = (
  p: ObjectFieldTemplateProperty,
  decoratorSettings: IDecoratorsMap | undefined,
): GridCellDetails | null => {
  if (decoratorSettings === undefined) {
    return null
  }

  const pathStepsToGridDecorator = generatePathToGridDetailsByIdSchema(
    getIdSchema(p),
  )

  const gridDecoratorParams = getFieldByPath(
    decoratorSettings,
    pathStepsToGridDecorator,
  )

  return gridDecoratorParams
}

interface IIdSchemaToGridDetailsMap {
  [idSchema: string]: GridCellDetails
}
const getIdSchemaToGridDetailsMap = (
  properties: Array<ObjectFieldTemplateProperty>,
  decoratorsSettings: IDecoratorsMap | undefined,
): IIdSchemaToGridDetailsMap => {
  return decoratorsSettings === undefined
    ? {}
    : (properties
        .map(
          (p) =>
            [
              getIdSchema(p),
              getGridDetailsFromPropertiesSchema(p, decoratorsSettings),
            ] as [string, GridCellDetails | null],
        )
        .filter((gridDetail: [string, GridCellDetails | null]) => {
          return gridDetail[1] !== null
        }) as Array<[string, GridCellDetails]>).reduce(
        (acc, curr) => ({
          ...acc,
          [curr[0]]: curr[1],
        }),
        {} as IIdSchemaToGridDetailsMap,
      )
}

const ObjectFieldTemplateFactory = (
  decoratorSettings: IDecoratorsMap | undefined = undefined,
) => (props: ObjectFieldTemplateProps) => {
  const IdSchemaToGridDetailsMap = getIdSchemaToGridDetailsMap(
    props.properties,
    decoratorSettings,
  )

  const [properties, gridProperties] = props.properties.reduce(
    (acc: any, curr: ObjectFieldTemplateProperty) => {
      return IdSchemaToGridDetailsMap[getIdSchema(curr)] === undefined
        ? [[...acc[0], curr], acc[1]]
        : [acc[0], [...acc[1], curr]]
    },
    [[], []] as [
      Array<ObjectFieldTemplateProperty>,
      Array<ObjectFieldTemplateProperty>,
    ],
  )

  gridProperties.sort(
    (a: ObjectFieldTemplateProperty, b: ObjectFieldTemplateProperty) =>
      (IdSchemaToGridDetailsMap[getIdSchema(a)].order as number) -
      (IdSchemaToGridDetailsMap[getIdSchema(b)].order as number),
  )

  return (
    <div>
      {props.title}
      {props.description}
      <Row>
        {gridProperties.map((p: any) => {
          const { order, ...colProps } = IdSchemaToGridDetailsMap[
            getIdSchema(p)
          ]

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

const Form = withTheme(AntDTheme)

export const gridFormFactory = (
  schema: JSONSchema7,
  decoratorSettings: IDecoratorsMap | undefined = undefined,
) => {
  const ObjectFieldTemplate = ObjectFieldTemplateFactory(decoratorSettings)

  return <Form schema={schema} ObjectFieldTemplate={ObjectFieldTemplate} />
}
