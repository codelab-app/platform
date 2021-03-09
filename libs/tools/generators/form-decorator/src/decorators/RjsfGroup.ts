// Decorator for Tabs, Accordion and Steps

const metadataKey = 'RjsfGroup'


export interface IRjsfGroup {
	'ObjectFieldTemplate': string
}

export const RjsfGroup = (props: IRjsfGroup) => {
	return (target: Function) => {
		Reflect.defineMetadata(metadataKey, props, target);
	}
}

export const getUiSchemaGroup = (target: Function): IRjsfGroup => {
	return Reflect.getOwnMetadata(metadataKey, target);
}
