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

const metaKey = 'grid'

export const grid = (params: GridDecoratorParams) =>
  reflectPropertyDecorator(metaKey, params)

export const getGridDecoratorDetails = (
  classWithGridDecorator: any,
): IDecoratorsMap | null => {
  const decoratorDetails = getReflectPropertyDecorators(
    classWithGridDecorator,
    metaKey,
  )

  if (Object.entries(decoratorDetails).length === 0) {
    return null
  }

  return decoratorDetails as IDecoratorsMap
}
