import { CustomKey, Default, Description, Enum, Property, Required, Schema, Title } from '@tsed/schema';
import { getJsonSchemaCustom } from '../processors/custom-tsed/getJsonSchemaCustom';
import { Type } from '@tsed/core';
import { getRjsfGroupProp, IRjsfGroupPropMetadata } from './RjsfGroupProp';
import { generateGridUiSchema, generateGroupsUiSchema } from '../processors';
import { getRjsfGridProp, IMetadata } from './RjsfGridProp';
import { getUiSchemaGrid } from './RjsfGrid';

// This will generate schema for a property decorated with clazz
const generateSchemaForClassType = (props: any, target: Object, propertyKey: string) => {
	const clazz = props.clazz
	if (props.condition) {
		processConditional(props, target, propertyKey, 'object')
	} else {
		let tsedSchemaDecorator
		if(props.type && props.type === 'array') {
			const obj: any = {
				type: 'array',
				items: {
					...getJsonSchemaCustom(clazz as Type<any>)
				}
			}
			if (props.title) {
				obj['title'] = props.title
			}
			tsedSchemaDecorator = Schema(obj)
		} else {
			const obj = {...getJsonSchemaCustom(clazz as Type<any>)}
			if (props.title) {
				obj['title'] = props.title
			}
			if (props.description) {
				obj['description'] = props.description
			}
			tsedSchemaDecorator = Schema(obj)
		}
		tsedSchemaDecorator(target, propertyKey)
	}
}

const generateSchemaForBasicType = (props: any, target: Object, propertyKey: string) => {

	const dataType = Reflect.getMetadata("design:type", target, propertyKey)
	let type = props.type ? props.type : dataType.name.toLowerCase()

	if (props.condition) {
		processConditional(props, target, propertyKey, type)
	} else {
		const tsedPropDecorator = Property(type)
		tsedPropDecorator(target, propertyKey)
		if (props.enum) {
			let tsedEnumDecorator
			if (props.enum.length > 0) {
				tsedEnumDecorator = Enum(...props.enum)
			} else {
				tsedEnumDecorator = Enum(props.enum)
			}
			tsedEnumDecorator(target, propertyKey)
		}
		if (props.required) {
			const tsedRequiredDecorator = Required()
			tsedRequiredDecorator(target, propertyKey)
		}
		if (props.title) {
			const tsedTitleDecorator = Title(props.title)
			tsedTitleDecorator(target, propertyKey)
		}

		if (props.description) {
			const tsedDescriptionDecorator = Description(props.description)
			tsedDescriptionDecorator(target, propertyKey)
		}

		if (props.default) {
			const tsedDefaultDecorator = Default(props.default)
			tsedDefaultDecorator(target, propertyKey)
		}

		if (props.type && props.type === 'array') {
			const obj: any = {
				type: 'array',
				items: {
					type: dataType.name.toLowerCase()
				}
			}
			if (props.title) {
				obj['title'] = props.title
			}
			const tsedSchemaDecorator = Schema(obj)
			tsedSchemaDecorator(target, propertyKey)
		}

	}
}

export const getMetadataForClassType = (props: any, target: Object, propertyKey: string) => {
	let metadata: any
	const clazz = props.clazz

	generateSchemaForClassType(props, target, propertyKey)

	// We will check what kind of decorators the Function has and take appropriate action
	const classDecorators = Reflect.getMetadataKeys(clazz)

	if (classDecorators.includes('RjsfGroup')) {
		const groupProps: IRjsfGroupPropMetadata[] = getRjsfGroupProp(props.clazz)
		metadata = {
			key: propertyKey,
			propMetadata: {
				...props,
				uiSchema: generateGroupsUiSchema(props.clazz)
			}
		}
		const propMetadata = metadata.propMetadata
		propMetadata[propertyKey] = groupProps
	}

	if (classDecorators.includes('RjsfGrid')) {
		const classDecorator = getUiSchemaGrid(props.clazz)
		const gridProps: IMetadata[] = getRjsfGridProp(props.clazz);
		metadata = {
			key: propertyKey,
			propMetadata: {
				...props,
				uiSchema: generateGridUiSchema(props.clazz),
				'ui:spacing': classDecorator['ui:spacing']
			}
		}
		const propMetadata = metadata.propMetadata
		propMetadata[propertyKey] = gridProps
	}

	if (classDecorators.includes('RjsfGrid') && classDecorators.includes('RjsfGroup')) {
		throw new Error('Class cannot have both RjsfGrid and RjsfGroup decorators')
	}

	return metadata
}

export const processConditional = (
	props: any,
	target: Object,
	propertyKey: string,
	dataType: string
) => {
	const condition = props.condition
	const existingObj = Reflect.getOwnMetadata('depKey', target.constructor);
	const oneOf: any = {
		type: 'object',
		properties: {}
	}

	oneOf.properties[condition.key] = {
		type: 'string',
		enum: [condition.value]
	}

	if (props.clazz) {
		oneOf.properties[propertyKey] = {...getJsonSchemaCustom(props.clazz as Type<any>)}
	} else {
		oneOf.properties[propertyKey] = {
			type: dataType
		}
	}


	if (props.title) {
		oneOf.properties[propertyKey]['title'] = props.title
	}

	if (existingObj) {
		if (!existingObj[condition.key]) {
			existingObj[condition.key] = {
				oneOf: []
			}
		}
		existingObj[condition.key].oneOf.push(oneOf)
		Reflect.defineMetadata('depKey', existingObj, target.constructor)
		const tsedCustomKeyDecorator = CustomKey('dependencies', existingObj)
		tsedCustomKeyDecorator(target)

	} else {
		const obj: any = {}
		obj[condition.key] = {
			oneOf: []
		}
		obj[condition.key].oneOf.push(oneOf)
		Reflect.defineMetadata('depKey', obj, target.constructor)
		const tsedCustomKeyDecorator = CustomKey('dependencies', obj)
		tsedCustomKeyDecorator(target)
	}
}

export const getMetadataForBasicType = (props: any, target: Object, propertyKey: string) => {
	let metadata: any

	generateSchemaForBasicType(props, target, propertyKey)

	metadata = {
		key: propertyKey,
		propMetadata: props
	}
	return metadata

}
