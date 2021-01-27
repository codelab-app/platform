import { ColProps } from 'antd/lib/col'
import {
  getReflectPropertyDecorators,
  reflectPropertyDecorator,
} from './reflectPropertyDecorator'

export interface GridDecoratorParams extends ColProps {
  order?: number
}

export interface GridDecoratorDetails {
  grid: GridDecoratorParams
}

export interface IDecoratorsMap {
  [propertyKey: string]: GridDecoratorDetails
}

const metakey = 'grid'

export const grid = (params: GridDecoratorParams): any =>
  reflectPropertyDecorator(metakey, params)

export const getGridDecoratorDetails = (
  classWithGridDecotor: any,
): GridDecoratorDetails | null => {
  const decoratorDetails = getReflectPropertyDecorators(
    classWithGridDecotor,
    metakey,
  )

  if (Object.entries(decoratorDetails).length === 0) {
    return null
  }

  return decoratorDetails as GridDecoratorDetails
}
