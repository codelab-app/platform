import dot from 'dot-object'
import { reduce } from 'lodash'

export type MapData = [src: string, target: string]

export class Mapper {
  original: object

  map: Array<MapData>

  constructor(original: object, map: Array<MapData>) {
    this.original = original
    this.map = map
  }

  execute() {
    return reduce<MapData, object>(
      this.map,
      (newShape: object, [src, target]: MapData) => {
        dot.copy(src, target, this.original, newShape)

        return newShape
      },
      {},
    )
  }
}
