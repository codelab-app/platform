import type {
  IAdminDataExport,
  IComponentExport,
  ITypesExport,
} from '@codelab/backend/abstract/core'
import { ExportAtomsCommand } from '@codelab/backend/application/atom'
import { ExportComponentsCommand } from '@codelab/backend/application/component'
import { exportTags } from '@codelab/backend/application/tag'
import {
  exportAtomApis,
  ExportSystemTypesCommand,
  ExportTypesCommand,
} from '@codelab/backend/application/type'
import { saveFormattedFile } from '@codelab/backend/shared/util'
import type { IAtomDTO, IInterfaceTypeDTO } from '@codelab/shared/abstract/core'
import { withTracing } from '@codelab/shared/infra/otel'
import { Inject, Injectable } from '@nestjs/common'
import type { ICommandHandler } from '@nestjs/cqrs'
import { CommandBus, CommandHandler } from '@nestjs/cqrs'
import filter from 'lodash/filter'
import find from 'lodash/find'
import path from 'path'
import { DataPaths } from '../data-paths'

@Injectable()
export class ExportAdminDataCommand {}

/**
 * This service should save the files as well, since admin data is all located in the same location
 */
@CommandHandler(ExportAdminDataCommand)
export class ExportAdminDataService
  implements ICommandHandler<ExportAdminDataCommand, void>
{
  private declare exportData: IAdminDataExport

  constructor(
    @Inject('DATA_PATHS') private readonly dataPaths: DataPaths,
    private commandBus: CommandBus,
  ) {}

  async execute() {
    const systemTypes = await this.commandBus.execute<
      ExportSystemTypesCommand,
      ITypesExport
    >(new ExportSystemTypesCommand())

    // const systemTypes = await withTracing(
    //   'ExportAdminDataService.exportSystemTypes()',
    //   () => exportSystemTypes(),
    // )()

    const atoms = await withTracing(
      'ExportAdminDataService.extractAtomsData()',
      () => this.extractAtomsData(),
    )()

    const tags = await withTracing('ExportAdminDataService.exportTags()', () =>
      exportTags(),
    )()

    const components = await this.commandBus.execute<
      ExportComponentsCommand,
      Array<IComponentExport>
    >(new ExportComponentsCommand())

    const exportData = {
      atoms,
      components,
      systemTypes,
      tags,
    }

    this.exportData = exportData
  }

  getData() {
    return {
      atoms: this.exportData.atoms,
      systemTypes: this.exportData.systemTypes,
      tags: this.exportData.tags,
    }
  }

  /**
   * Allows us to save to filesystem if we choose to
   *
   * (await new ExportAdminDataService().execute()).save()
   */
  saveAsFiles() {
    for (const { api, atom, fields, types } of this.exportData.atoms) {
      saveFormattedFile(
        path.resolve(this.dataPaths.ATOMS_PATH, `${atom.name}.json`),
        {
          api,
          atom,
          fields,
          types,
        },
      )
    }

    saveFormattedFile(this.dataPaths.TAGS_FILE_PATH, this.exportData.tags)

    saveFormattedFile(
      this.dataPaths.SYSTEM_TYPES_FILE_PATH,
      this.exportData.systemTypes,
    )

    for (const componentData of this.exportData.components) {
      this.saveComponentAsFile(componentData)
    }

    return this.getData()
  }

  private async extractAtomsData() {
    const atoms = await this.commandBus.execute<
      ExportAtomsCommand,
      Array<IAtomDTO>
    >(new ExportAtomsCommand())

    const apis = await exportAtomApis()

    return Promise.all(
      atoms.map(async (atom) => {
        /**
         * Get the interface by id
         */
        const api = find(apis.types, { id: atom.api?.id }) as
          | IInterfaceTypeDTO
          | undefined

        const apiFields = filter(apis.fields, { api: { id: atom.api?.id } })

        const { fields = [], types } = await this.commandBus.execute(
          new ExportTypesCommand({
            typeIds: [atom.api],
          }),
        )

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

  saveComponentAsFile(componentData: IComponentExport) {
    const { component, descendantElements, fields, types } = componentData
    // Component name can have spaces, which can cause issues with file names
    const name = component.name.replace(/ /g, '')

    saveFormattedFile(
      path.resolve(this.dataPaths.COMPONENTS_PATH, `${name}.json`),
      {
        component,
        descendantElements,
        fields,
        types,
      },
    )
  }
}
