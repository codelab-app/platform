import type { IAdminExport } from '@codelab/shared/abstract/core'

import {
  formatToPrettifiedJson,
  writeFileSyncWithDirs,
} from '@codelab/backend/shared/util'
import { deepSortKeys } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'
import path from 'path'

import { MigrationDataService } from './migration-data.service'

@Injectable()
export class WriteAdminDataService {
  constructor(public migrationDataService: MigrationDataService) {}

  /**
   * Write data to the volume
   */
  async saveData(data: IAdminExport) {
    const { atoms, components, systemTypes, tags } = deepSortKeys(data)

    await this.writeAtomsData(atoms)
    await this.writeTagsData(tags)
    await this.writeSystemTypesData(systemTypes)
    await this.writeComponentsData(components)

    return { atoms, components, systemTypes, tags }
  }

  private async writeAtomsData(atoms: IAdminExport['atoms']) {
    for (const { api, atom } of atoms) {
      const outputPath = path.resolve(
        this.migrationDataService.atomsPath,
        `${atom.name}.json`,
      )

      const stringData = await formatToPrettifiedJson({
        api,
        atom,
      })

      writeFileSyncWithDirs(outputPath, stringData)
    }
  }

  private async writeComponentsData(components: IAdminExport['components']) {
    for (const { api, component, elements, store } of components) {
      // Component name can have spaces, which can cause issues with file names
      const name = component.name.replace(/ /g, '')

      const stringData = await formatToPrettifiedJson({
        api,
        component,
        elements,
        store,
      })

      const outputPath = path.resolve(
        this.migrationDataService.componentsPath,
        `${name}.json`,
      )

      writeFileSyncWithDirs(outputPath, stringData)
    }
  }

  private async writeSystemTypesData(systemTypes: IAdminExport['systemTypes']) {
    const stringData = await formatToPrettifiedJson(systemTypes)

    writeFileSyncWithDirs(
      this.migrationDataService.systemTypesFilePath,
      stringData,
    )
  }

  private async writeTagsData(tags: IAdminExport['tags']) {
    const stringData = await formatToPrettifiedJson(tags)

    writeFileSyncWithDirs(this.migrationDataService.tagsFilePath, stringData)
  }
}
