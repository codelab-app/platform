import { ColProps } from 'antd/lib/col'

interface GridDecoratorParams extends ColProps {
  order?: number
}
export const grid = (params: GridDecoratorParams): any => {
  /**
   * empty decorator
   * we use it for:
   * 1. params type checking
   * 2. pass grid metadata to the generator
   * */
}
