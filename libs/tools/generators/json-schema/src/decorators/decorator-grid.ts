import { ColProps } from 'antd/lib/col'
import {
  getReflectClassDecorator,
  reflectClassDecorator,
} from './decorator-reflect--class'

type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends object
    ? Partial<GridDecoratorParam> & RecursivePartial<T[P]>
    : GridDecoratorParam
}

export const gridDetailsName = '__grid'

export interface GridDecoratorParam {
  [gridDetailsName]: GridParams
}

export interface GridParams extends ColProps {
  order?: number
}

export interface GridDecoratorDetails {
  [gridDetailsName]: GridParams
}

export type DecoratorsMap<T = any> = RecursivePartial<T>

export const gridDecoratorMetaKey = 'grid'

export const Grid = <T = any>(params?: RecursivePartial<T>) =>
  reflectClassDecorator(gridDecoratorMetaKey, params)

export const getGridDecoratorDetails = (
  classWithGridDecorator: any,
): DecoratorsMap | null => {
  const decoratorDetails = getReflectClassDecorator(
    classWithGridDecorator,
    gridDecoratorMetaKey,
  )

  return Object.entries(decoratorDetails).length === 0
    ? null
    : (decoratorDetails as DecoratorsMap)
}
