import { CustomKey, Default, Description, Enum, JsonSchema, Property, Required, Schema, Title } from '@tsed/schema';
import { getJsonSchemaCustom } from '../processors/custom-tsed/getJsonSchemaCustom';
import { Type } from '@tsed/core';
import { getRjsfGroupProp, IRjsfGroupPropMetadata } from './RjsfGroupProp';
import { generateGridUiSchema, generateGroupsUiSchema } from '../processors';
import { getRjsfGridProp, IMetadata } from './RjsfGridProp';
import { getUiSchemaGrid } from './RjsfGrid';

const isBoolean = (val: any) => {
	return val === false || val === true
}

// This will generate schema for a property decorated with clazz
const generateSchemaForClassType = (props: any, target: Object, propertyKey: string) => {
	const clazz = props.clazz
	if (props.condition) {
		processConditional(props, target, propertyKey, 'object')
	} else {
		let tsedSchemaDecorator
		if(props.isArray) {
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
			if (props.isMultipleChoice) {
				const obj: any = {
					type: 'array',
					items: {
						type: 'string',
						enum: props.enum
					},
					uniqueItems: true
				}
				if (props.type) {
					obj.items.type = props.type
				}

				if (props.title || props.title === '') {
					obj.title = props.title
				}

				if (props.description || props.description === '') {
					obj.description = props.description
				}

				if (props.default) {
					obj.default = props.default
				}
				const tsedSchemaDecorator = Schema(obj)
				tsedSchemaDecorator(target, propertyKey)
			} else {
				let tsedEnumDecorator
				if (props.enum.length > 0) {
					tsedEnumDecorator = Enum(...props.enum)
				} else {
					tsedEnumDecorator = Enum(props.enum)
				}
				tsedEnumDecorator(target, propertyKey)
				if (props.enumNames) {
					const tsedSchemaDecorator = Schema({
						enumNames: props.enumNames
					} as unknown as JsonSchema)
					tsedSchemaDecorator(target, propertyKey)
				}
			}

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

		if (props.default || props.default === 0) {
			const tsedDefaultDecorator = Default(props.default)
			tsedDefaultDecorator(target, propertyKey)
		}

		if (props.isArray) {
			const obj: any = {
				type: 'array',
				items: {
					type: 'string'
				}
			}

			if (props.default || props.default === 0 || props.default === false) {
				obj.default = props.default
			}

			if (props.type) {
				obj.items.type = props.type
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
		enum: [condition.value]
	}

	if (props.clazz) {
		oneOf.properties[propertyKey] = {...getJsonSchemaCustom(props.clazz as Type<any>, {customKeys: true})}
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
		if (isBoolean(condition.value) && existingObj[condition.key].oneOf < 2) {
			const oneOfObj: any = {
				type: 'object',
				properties: {
				}
			}
			oneOfObj.properties[condition.key] = {
				enum: [!condition.value]
			}
			existingObj[condition.key].oneOf.push(oneOfObj)
		}
		Reflect.defineMetadata('depKey', existingObj, target.constructor)
		const tsedCustomKeyDecorator = CustomKey('dependencies', existingObj)
		tsedCustomKeyDecorator(target)

	} else {
		const obj: any = {}
		obj[condition.key] = {
			oneOf: []
		}
		obj[condition.key].oneOf.push(oneOf)
		if (isBoolean(condition.value) && obj[condition.key].oneOf.length < 2) {
			const oneOfObj: any = {
				type: 'object',
				properties: {
				}
			}
			oneOfObj.properties[condition.key] = {
				enum: [!condition.value]
			}
			obj[condition.key].oneOf.push(oneOfObj)
		}
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
