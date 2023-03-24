import type { IAdminDataExport } from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import { exportAtoms } from '@codelab/backend/application/atom'
import { exportTags } from '@codelab/backend/application/tag'
import {
  exportAdminTypes,
  exportAtomApis,
  exportSystemTypes,
} from '@codelab/backend/application/type'
import type { IInterfaceTypeDTO } from '@codelab/frontend/abstract/core'
import filter from 'lodash/filter'
import find from 'lodash/find'
import path from 'path'
import { DataPaths } from '../data-paths'

/**
 * This service should save the files as well, since admin data is all located in the same location
 */
export class ExportAdminDataService extends IUseCase<void, IAdminDataExport> {
  dataPaths: DataPaths

  constructor(
    // Allow base directory override for testing purpose
    DATA_EXPORT_PATH = path.resolve('./data/export'),
  ) {
    super()
    this.dataPaths = new DataPaths(DATA_EXPORT_PATH)
  }

  async _execute() {
    const systemTypes = await exportSystemTypes()
    const atoms = await this.extractAtomsData()
    const tags = await exportTags()

    return {
      atoms,
      systemTypes,
      tags,
    }
  }

  private async extractAtomsData() {
    const atoms = await exportAtoms()
    const apis = await exportAtomApis()

    return Promise.all(
      atoms.map(async (atom) => {
        /**
         * Get the interface by id
         */
        const api = find(apis.types, { id: atom.api.id }) as
          | IInterfaceTypeDTO
          | undefined

        const apiFields = filter(apis.fields, { api: { id: atom.api.id } })

        const { fields = [], types } = await exportAdminTypes({
          apiId: atom.api.id,
        })

        if (!api) {
          throw new Error('Missing api')
        }

        return {
          api,
          atom,
          fields: [...apiFields, ...fields],
          types,
        }
      }),
    )
  }
}
