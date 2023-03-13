import { IUseCase } from '@codelab/backend/abstract/types'
import { exportAtoms } from '@codelab/backend/application/atom'
import { exportTags } from '@codelab/backend/application/tag'
import {
  exportAdminInterfaceTypes,
  exportAdminTypes,
  exportSystemTypes,
} from '@codelab/backend/application/type'
import { saveFormattedFile } from '@codelab/backend/shared/util'
import find from 'lodash/find'
import path from 'path'
import { DataPaths } from '../data-paths'

/**
 * This service should save the files as well, since admin data is all located in the same location
 */
export class ExportAdminDataService extends IUseCase<void, void> {
  dataPaths: DataPaths

  constructor(
    // Allow base directory override for testing purpose
    DATA_EXPORT_PATH = path.resolve('./data/export'),
  ) {
    super()
    this.dataPaths = new DataPaths(DATA_EXPORT_PATH)
  }

  async _execute() {
    await this.saveSystemTypesFile()
    await this.saveAtomsFile()
    await this.saveTagsFile()

    return
  }

  private async saveAtomsFile() {
    const atoms = await exportAtoms()
    const apis = await exportAdminInterfaceTypes()

    await Promise.all(
      atoms.map(async (atom) => {
        /**
         * Get the interface by id
         */
        const type = find(apis, { id: atom.api.id })
        const types = await exportAdminTypes({ apiId: atom.api.id })

        saveFormattedFile(
          path.resolve(this.dataPaths.ATOMS_PATH, `${atom.name}.json`),
          {
            atom,
            api: type,
            types,
          },
        )
      }),
    )
  }

  private async saveTagsFile() {
    const tags = await exportTags()

    saveFormattedFile(this.dataPaths.TAGS_FILE_PATH, tags)
  }

  private async saveSystemTypesFile() {
    const systemTypes = await exportSystemTypes()

    saveFormattedFile(this.dataPaths.SYSTEM_TYPES_FILE_PATH, systemTypes)
  }
}
