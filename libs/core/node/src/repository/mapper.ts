import dot from 'dot-object'

export class Mapper {
  original: any

  map: any

  constructor(original: any, map: any) {
    this.original = original
    this.map = map
  }

  execute() {
    return this.map.reduce((target: any, paths: any) => {
      const sourcePath = paths[0]
      const targetPath = paths[1]

      return dot.copy(sourcePath, targetPath, this.original, target)
    }, {})
  }
}
