import { DataMapperStrategy } from './node-mapper'

/**
 * A factory encapsulates different representations of data using mappers. We encode domain specific data shapes, like form data, node dto, query data.
 */
export class NodeFactory {
  data?: any

  mapper?: DataMapperStrategy

  setData(data: any) {
    this.data = data
  }

  setStrategy(mapper: DataMapperStrategy) {
    this.mapper = mapper
  }

  mapData() {
    return this.mapper?.execute(this.data)
  }
}
