import { TraceService } from '@codelab/backend/infra/adapter/otel'
import {
  formatToPrettifiedJson,
  writeFileSyncWithDirs,
} from '@codelab/backend/shared/util'
import type { IAdminAggregate } from '@codelab/shared/abstract/core'
import { deepSortKeys } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'
import path from 'path'
import { MigrationDataService } from './migration-data.service'

@Injectable()
export class WriteAdminDataService {
  constructor(
    private traceService: TraceService,
    public migrationDataService: MigrationDataService,
  ) {}

  /**
   * Write data to the volume
   */
  async saveData(data: IAdminAggregate) {
    const { atoms, components, systemTypes, tags } = deepSortKeys(data)

    await this.writeAtomsData(atoms)
    await this.writeTagsData(tags)
    await this.writeSystemTypesData(systemTypes)
    await this.writeComponentsData(components)

    return { atoms, components, systemTypes, tags }
  }

  private async writeAtomsData(atoms: IAdminAggregate['atoms']) {
    for (const { api, atom } of atoms) {
      const outputPath = path.resolve(
        this.migrationDataService.atomsPath,
        `${atom.name}.json`,
      )

      const stringData = await formatToPrettifiedJson({
        api,
        atom,
      })

      const span = this.traceService.getSpan()

      span?.addEvent('Saving atoms data to', {
        outputPath,
        stringData,
      })

      writeFileSyncWithDirs(outputPath, stringData)
    }
  }

  private async writeComponentsData(components: IAdminAggregate['components']) {
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

  private async writeSystemTypesData(
    systemTypes: IAdminAggregate['systemTypes'],
  ) {
    const stringData = await formatToPrettifiedJson(systemTypes)

    writeFileSyncWithDirs(
      this.migrationDataService.systemTypesFilePath,
      stringData,
    )
  }

  private async writeTagsData(tags: IAdminAggregate['tags']) {
    const stringData = await formatToPrettifiedJson(tags)

    writeFileSyncWithDirs(this.migrationDataService.tagsFilePath, stringData)
  }
}
