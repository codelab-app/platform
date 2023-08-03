import type {
  IAdminDataExport,
  IAtomExport,
  IComponentExport,
  ITypesExport,
} from '@codelab/backend/abstract/core'
import { ExportAtomsCommand } from '@codelab/backend/application/atom'
import { ExportComponentsCommand } from '@codelab/backend/application/component'
import { ExportTagsCommand } from '@codelab/backend/application/tag'
// import { exportTags } from '@codelab/backend/application/tag'
import {
  // exportAtomApis,
  ExportSystemTypesCommand,
  ExportTypesCommand,
} from '@codelab/backend/application/type'
import { saveFormattedFile } from '@codelab/backend/shared/util'
import type {
  IAtomDTO,
  IInterfaceTypeDTO,
  ITagDTO,
} from '@codelab/shared/abstract/core'
import { withTracing } from '@codelab/shared/infra/otel'
import { Inject, Injectable } from '@nestjs/common'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'
import filter from 'lodash/filter'
import find from 'lodash/find'
import path from 'path'
import { MigrationDataService } from '../migration-data.service'

@Injectable()
export class ExportAdminDataCommand {
  constructor(public baseDataPaths?: string) {}
}

/**
 * This service should save the files as well, since admin data is all located in the same location
 */
@CommandHandler(ExportAdminDataCommand)
export class ExportAdminDataService
  implements ICommandHandler<ExportAdminDataCommand, IAdminDataExport>
{
  constructor(
    private readonly migrationDataService: MigrationDataService,
    private commandBus: CommandBus,
  ) {}

  async execute(command: ExportAdminDataCommand) {
    const { baseDataPaths } = command

    if (baseDataPaths) {
      this.migrationDataService.basePaths = baseDataPaths
    }

    const systemTypes = await this.commandBus.execute<
      ExportSystemTypesCommand,
      ITypesExport
    >(new ExportSystemTypesCommand())

    const atoms = await this.commandBus.execute<
      ExportAtomsCommand,
      Array<IAtomExport>
    >(new ExportAtomsCommand())

    const tags = await this.commandBus.execute<
      ExportTagsCommand,
      Array<ITagDTO>
    >(new ExportTagsCommand())

    const components = await this.commandBus.execute<
      ExportComponentsCommand,
      Array<IComponentExport>
    >(new ExportComponentsCommand())

    return {
      atoms,
      components,
      systemTypes,
      tags,
    }
  }

  /**
   * Allows us to save to filesystem if we choose to
   *
   * (await new ExportAdminDataService().execute()).save()
   */
  // saveAsFiles() {
  //   for (const { api, atom, fields, types } of this.exportData.atoms) {
  //     saveFormattedFile(
  //       path.resolve(this.migrationDataService.atomsPath, `${atom.name}.json`),
  //       {
  //         api,
  //         atom,
  //         fields,
  //         types,
  //       },
  //     )
  //   }

  //   saveFormattedFile(
  //     this.migrationDataService.tagsFilePath,
  //     this.exportData.tags,
  //   )

  //   saveFormattedFile(
  //     this.migrationDataService.systemTypesFilePath,
  //     this.exportData.systemTypes,
  //   )

  //   for (const componentData of this.exportData.components) {
  //     this.saveComponentAsFile(componentData)
  //   }

  //   return this.getData()
  // }

  saveComponentAsFile(componentData: IComponentExport) {
    const { component, descendantElements, fields, types } = componentData
    // Component name can have spaces, which can cause issues with file names
    const name = component.name.replace(/ /g, '')

    saveFormattedFile(
      path.resolve(this.migrationDataService.componentsPath, `${name}.json`),
      {
        component,
        descendantElements,
        fields,
        types,
      },
    )
  }
}
