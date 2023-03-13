import path from 'path'

export class DataPaths {
  readonly SYSTEM_TYPES_FILE_PATH = path.resolve(
    this.DATA_EXPORT_PATH,
    './system/types/system-types.json',
  )

  readonly ATOMS_PATH = path.resolve(this.DATA_EXPORT_PATH, './admin/atoms')

  readonly TAGS_FILE_PATH = path.resolve(
    this.DATA_EXPORT_PATH,
    './admin/tags/tags.json',
  )

  constructor(
    // Allow base directory override for testing purpose
    private readonly DATA_EXPORT_PATH = path.resolve('./data/export'),
  ) {}
}
