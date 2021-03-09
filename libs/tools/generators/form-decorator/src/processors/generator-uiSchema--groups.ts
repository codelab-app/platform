import "reflect-metadata";

import { getRjsfGroupProp, IRjsfGroupPropMetadata } from '../decorators/RjsfGroupProp';
import { getUiSchemaGroup, IRjsfGroup } from '../decorators/RjsfGroup';

export interface IUiGroups {
	panelTitle: string,
	fields: string[]
}

const findObjProps = (props: IRjsfGroupPropMetadata[]) => {
	const result: IRjsfGroupPropMetadata[] =  props.filter((p: IRjsfGroupPropMetadata) => {
		return p.propMetadata.hasOwnProperty(p.key)
	})
	if (result.length > 0) {
		return result
	} else {
		throw new Error('not found')
	}
}

const processBasicProps = (props: IRjsfGroupPropMetadata[], uiLayoutObj: IUiGroups[]) => {
	const uniqueTitles: string[] = props.map(p => {
		return p.propMetadata.panelTitle
	}).filter((v, i, a) => a.indexOf(v) === i && v !== undefined);

	uniqueTitles.forEach((tabTitle: string) => {
		const fields: IRjsfGroupPropMetadata[] = props.filter((p: IRjsfGroupPropMetadata) => {
			return p.propMetadata.panelTitle === tabTitle
		})

		const result: IUiGroups = {
			panelTitle: tabTitle,
			fields: []
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

const processObjectProps = (props: IRjsfGroupPropMetadata[], uiLayoutObj: any) => {
	try {
		const findObjectProps: IRjsfGroupPropMetadata[] = findObjProps(props)
		findObjectProps.forEach((item: IRjsfGroupPropMetadata) => {
			if (item.propMetadata.uiSchema) {
				uiLayoutObj[item.key] = item.propMetadata.uiSchema
			} else {
				const itemProps: any = item.propMetadata[item.key]
				const classDecorator: IRjsfGroup = getUiSchemaGroup(item.propMetadata.clazz as Function)
				uiLayoutObj[item.key] = {
					'ui:ObjectFieldTemplate': classDecorator.ObjectFieldTemplate,
					'ui:groups': []
				}
				processBasicProps(itemProps, uiLayoutObj[item.key]['ui:groups'])
				processObjectProps(itemProps, uiLayoutObj[item.key])
			}

		})
	} catch (e) {
		throw e
	}
}

export const generateGroupsUiSchema = (target: Function) => {
	const props: IRjsfGroupPropMetadata[] = getRjsfGroupProp(target)
	const classDecorator: IRjsfGroup = getUiSchemaGroup(target)

	const uiSchema: any = {
		'ui:ObjectFieldTemplate': classDecorator.ObjectFieldTemplate,
		'ui:groups': []
	}

	processBasicProps(props, uiSchema['ui:groups'])
	try {
		processObjectProps(props, uiSchema)
	} catch (e) {}
	finally {
		return uiSchema
	}
}
