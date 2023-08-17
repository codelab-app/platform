import { type IAdminDataExport } from '@codelab/backend/abstract/core'
import { TraceService } from '@codelab/backend/infra/adapter/otel'
import {
  formatToPrettifiedJson,
  writeFileSyncWithDirs,
} from '@codelab/backend/shared/util'
import { Injectable, Scope } from '@nestjs/common'
import { findUpSync } from 'find-up'
import fs from 'fs'
import path, { dirname } from 'path'

export interface IBaseDataPaths {
  baseDataPaths?: string
}

@Injectable({
  scope: Scope.TRANSIENT,
})
export class MigrationDataService implements IBaseDataPaths {
  constructor(private traceService: TraceService) {}

  /**
   * process.cwd() doesn't work since run-commands may set app dir as cwd
   */
  baseDataPaths = path.resolve(
    dirname(findUpSync('package.json')!),
    './data/export',
  )

  /**
   * Allows override by setting at runtime
   */
  set basePaths(basePath: string) {
    this.baseDataPaths = basePath
  }

  get systemTypesFilePath() {
    return path.resolve(this.baseDataPaths, './system/types/system-types.json')
  }

  get atomsPath() {
    return path.resolve(this.baseDataPaths, './admin/atoms')
  }

  get tagsFilePath() {
    return path.resolve(this.baseDataPaths, './admin/tags/tags.json')
  }

  get componentsPath() {
    return path.resolve(this.baseDataPaths, './admin/components')
  }

  /**
   * Write data to the volume
   */
  saveData(data: IAdminDataExport) {
    this.writeAtomsData(data.atoms)
    // this.writeTagsData(data.tags)
    // this.writeSystemTypesData(data.systemTypes)
    // this.writeComponentsData(data.components)

    return data
  }

  private writeAtomsData(atoms: IAdminDataExport['atoms']) {
    for (const { api, atom, fields, types } of atoms) {
      const outputPath = path.resolve(this.atomsPath, `${atom.name}.json`)

      const stringData = formatToPrettifiedJson({
        api,
        atom,
        fields,
        types,
      })

      const span = this.traceService.getSpan()!

      span.addEvent('Saving atoms data to', {
        outputPath,
        stringData,
      })

      writeFileSyncWithDirs(outputPath, stringData)
    }
  }

  private writeSystemTypesData(systemTypes: IAdminDataExport['systemTypes']) {
    const stringData = formatToPrettifiedJson(systemTypes)

    fs.writeFileSync(this.systemTypesFilePath, stringData)
  }

  private writeTagsData(tags: IAdminDataExport['tags']) {
    const stringData = formatToPrettifiedJson(tags)

    fs.writeFileSync(this.tagsFilePath, stringData)
  }

  private writeComponentsData(components: IAdminDataExport['components']) {
    for (const { component, descendantElements, fields, types } of components) {
      // Component name can have spaces, which can cause issues with file names
      const name = component.name.replace(/ /g, '')

      const stringData = formatToPrettifiedJson({
        component,
        descendantElements,
        fields,
        types,
      })

      const outputPath = path.resolve(this.componentsPath, `${name}.json`)

      fs.writeFileSync(outputPath, stringData)
    }
  }
}
