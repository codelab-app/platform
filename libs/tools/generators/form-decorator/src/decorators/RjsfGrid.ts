import 'reflect-metadata'

const metadataKey = 'RjsfGrid'

export interface IUiSchemaGrid {
  'ui:spacing': number
  ObjectFieldTemplate: 'RjsfGridFieldTemplate'
}

export const RjsfGrid = (props: IUiSchemaGrid) => {
  return (target: Function) => {
    Reflect.defineMetadata(metadataKey, props, target)
  }
}

export function getUiSchemaGrid(target: any): IUiSchemaGrid {
  return Reflect.getOwnMetadata(metadataKey, target)
}
