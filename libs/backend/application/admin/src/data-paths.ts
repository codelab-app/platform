import path from 'path'

export class DataPaths {
  constructor(
    // Allow base directory override for testing purpose
    private readonly DATA_PATH = path.resolve('./data/export'),
  ) {}

  get SYSTEM_TYPES_FILE_PATH() {
    return path.resolve(this.DATA_PATH, './system/types/system-types.json')
  }

  get ATOMS_PATH() {
    return path.resolve(this.DATA_PATH, './admin/atoms')
  }

  get TAGS_FILE_PATH() {
    return path.resolve(this.DATA_PATH, './admin/tags/tags.json')
  }

  get COMPONENTS_PATH() {
    return path.resolve(this.DATA_PATH, './admin/components')
  }
}
