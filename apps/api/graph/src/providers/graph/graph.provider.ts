import { FactoryProvider } from '@nestjs/common'
import { Graph } from './graph'

export const graphFactory: FactoryProvider = {
  provide: 'GRAPH',
  useFactory: () => {
    return new Graph()
  },
}
