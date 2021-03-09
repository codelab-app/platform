import "reflect-metadata";

const metadataKey = 'RjsfGrid'

export interface IRjsfGrid {
	'ui:spacing': number
	'ObjectFieldTemplate': 'RjsfGridFieldTemplate'
}

export const RjsfGrid = (props: IRjsfGrid) => {
	return (target: Function) => {
		Reflect.defineMetadata(metadataKey, props, target);
	}
}

export function getUiSchemaGrid(target: any): IRjsfGrid {
	return Reflect.getOwnMetadata(metadataKey, target);
}
