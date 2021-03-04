import 'reflect-metadata'

import { IUiSchemaGroup, getUiSchemaGroup } from '../decorators/RjsfGroup'
import {
  IRjsfGroupPropMetadata,
  getRjsfGroupProp,
} from '../decorators/RjsfGroupProp'

export interface IUiGroups {
  panelTitle: string
  fields: Array<string>
}

const findObjProps = (props: Array<IRjsfGroupPropMetadata>) => {
  const result: Array<IRjsfGroupPropMetadata> = props.filter(
    (p: IRjsfGroupPropMetadata) => {
      return p.propMetadata.hasOwnProperty(p.key)
    },
  )

  if (result.length > 0) {
    return result
  }

  throw new Error('not found')
}

const processBasicProps = (
  props: Array<IRjsfGroupPropMetadata>,
  uiLayoutObj: Array<IUiGroups>,
) => {
  const uniqueTitles: Array<string> = props
    .map((p) => {
      return p.propMetadata.panelTitle
    })
    .filter((v, i, a) => a.indexOf(v) === i && v !== undefined)

  uniqueTitles.forEach((tabTitle: string) => {
    const fields: Array<IRjsfGroupPropMetadata> = props.filter(
      (p: IRjsfGroupPropMetadata) => {
        return p.propMetadata.panelTitle === tabTitle
      },
    )

    const result: IUiGroups = {
      panelTitle: tabTitle,
      fields: [],
    }

    fields.forEach((field: IRjsfGroupPropMetadata) => {
      if (field.propMetadata.order || field.propMetadata.order === 0) {
        result.fields[field.propMetadata.order] = field.key
      } else {
        result.fields.push(field.key)
      }
    })
    uiLayoutObj.push(result)
  })
}

const processObjectProps = (
  props: Array<IRjsfGroupPropMetadata>,
  uiLayoutObj: any,
) => {
  const findObjectProps: Array<IRjsfGroupPropMetadata> = findObjProps(props)

  findObjectProps.forEach((item: IRjsfGroupPropMetadata) => {
    if (item.propMetadata.uiSchema) {
      uiLayoutObj[item.key] = item.propMetadata.uiSchema
    } else {
      const itemProps: any = item.propMetadata[item.key]
      const classDecorator: IUiSchemaGroup = getUiSchemaGroup(
        item.propMetadata.clazz,
      )

      uiLayoutObj[item.key] = {
        'ui:ObjectFieldTemplate': classDecorator.ObjectFieldTemplate,
        'ui:groups': [],
      }
      processBasicProps(itemProps, uiLayoutObj[item.key]['ui:groups'])
      processObjectProps(itemProps, uiLayoutObj[item.key])
    }
  })
}

export const generateGroupsUiSchema = (target: Function) => {
  const props: Array<IRjsfGroupPropMetadata> = getRjsfGroupProp(target)
  const classDecorator: IUiSchemaGroup = getUiSchemaGroup(target)

  const uiSchema: any = {
    'ui:ObjectFieldTemplate': classDecorator.ObjectFieldTemplate,
    'ui:groups': [],
  }

  processBasicProps(props, uiSchema['ui:groups'])
  try {
    processObjectProps(props, uiSchema)
  } catch (e) {
    //
  }

  return uiSchema
}
