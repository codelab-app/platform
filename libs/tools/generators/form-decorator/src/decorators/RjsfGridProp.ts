import "reflect-metadata";
import { getMetadataForBasicType, getMetadataForClassType } from './utils';

const formatMetadataKey = "RjsfGridProp";

export interface IProps {
	row: number
	span: number
	order?: number
	clazz?: Function
	uiSchema?: any
	type?: 'string' | 'number' | 'integer' | 'boolean' | 'array'
	title?: string
	description?: string
	default?: string
	enum?: any
	required?: boolean,
	ignore?: boolean
	condition?: { key: string, value: string }
	[prop: string]: any
}

export interface IMetadata {
	key: string
	propMetadata: IProps
}

export function RjsfGridProp(props: IProps) {
	return function(target: Object, propertyKey: string) {
		let metadata: IMetadata
		if (props.clazz) {
			metadata = getMetadataForClassType(props, target, propertyKey)
		} else {
			metadata = getMetadataForBasicType(props, target, propertyKey)
		}

		if (metadata) {
			const annotations: IMetadata[] = Reflect.getOwnMetadata(formatMetadataKey, target.constructor);
			if (annotations) {
				annotations.push(metadata)
				Reflect.defineMetadata(formatMetadataKey, annotations, target.constructor)
			} else {
				Reflect.defineMetadata(formatMetadataKey, [metadata], target.constructor)
			}
		}
	}
}

export function getRjsfGridProp(target: any): IMetadata[] {
	return Reflect.getOwnMetadata(formatMetadataKey, target);
}
