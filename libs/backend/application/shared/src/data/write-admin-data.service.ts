import { type IAdminOutputDto } from '@codelab/backend/abstract/core'
import { Span, TraceService } from '@codelab/backend/infra/adapter/otel'
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
  constructor(
    private traceService: TraceService,
    public migrationDataService: MigrationDataService,
  ) {}

  /**
   * Write data to the volume
   */
  @Span()
  saveData(data: IAdminOutputDto) {
    const { atoms, components, systemTypes, tags } = deepSortKeys(data)

    this.writeAtomsData(atoms)
    this.writeTagsData(tags)
    this.writeSystemTypesData(systemTypes)
    this.writeComponentsData(components)

    return { atoms, components, systemTypes, tags }
  }

  @Span()
  private writeAtomsData(atoms: IAdminOutputDto['atoms']) {
    for (const { api, atom } of atoms) {
      const outputPath = path.resolve(
        this.migrationDataService.atomsPath,
        `${atom.name}.json`,
      )

      const stringData = formatToPrettifiedJson({
        api,
        atom,
      })

      const span = this.traceService.getSpan()!

      span.addEvent('Saving atoms data to', {
        outputPath,
        stringData,
      })

      writeFileSyncWithDirs(outputPath, stringData)
    }
  }

  private writeComponentsData(components: IAdminOutputDto['components']) {
    for (const { api, component, descendantElements, store } of components) {
      // Component name can have spaces, which can cause issues with file names
      const name = component.name.replace(/ /g, '')

      const stringData = formatToPrettifiedJson({
        api,
        component,
        descendantElements,
        store,
      })

      const outputPath = path.resolve(
        this.migrationDataService.componentsPath,
        `${name}.json`,
      )

      writeFileSyncWithDirs(outputPath, stringData)
    }
  }

  private writeSystemTypesData(systemTypes: IAdminOutputDto['systemTypes']) {
    const stringData = formatToPrettifiedJson(systemTypes)

    writeFileSyncWithDirs(
      this.migrationDataService.systemTypesFilePath,
      stringData,
    )
  }

  private writeTagsData(tags: IAdminOutputDto['tags']) {
    const stringData = formatToPrettifiedJson(tags)

    writeFileSyncWithDirs(this.migrationDataService.tagsFilePath, stringData)
  }
}
