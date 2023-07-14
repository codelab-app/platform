import type { ComponentWhere } from '@codelab/backend/abstract/codegen'
import type {
  IAdminDataExport,
  IComponentExportData,
} from '@codelab/backend/abstract/core'
import { exportAtoms } from '@codelab/backend/application/atom'
import { exportComponents } from '@codelab/backend/application/component'
import { UseCase } from '@codelab/backend/application/service'
import { exportTags } from '@codelab/backend/application/tag'
import {
  exportAdminTypes,
  exportAtomApis,
  exportSystemTypes,
} from '@codelab/backend/application/type'
import { saveFormattedFile } from '@codelab/backend/shared/util'
import type { IInterfaceTypeDTO } from '@codelab/shared/abstract/core'
import filter from 'lodash/filter'
import find from 'lodash/find'
import path from 'path'
import { DataPaths } from '../data-paths'

/**
 * This service should save the files as well, since admin data is all located in the same location
 */
export class ExportAdminDataService extends UseCase<
  void,
  ExportAdminDataService
> {
  dataPaths: DataPaths

  private declare exportData: IAdminDataExport

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
    const components = await this.extractComponentsData()

    const exportData = {
      atoms,
      components,
      systemTypes,
      tags,
    }

    this.exportData = exportData

    return this
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
          apiFields,
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

  private async extractComponentsData(where?: ComponentWhere) {
    const componentsData = await exportComponents(where)
    const apis = await exportAtomApis()

    return Promise.all(
      componentsData.map(async (componentData) => {
        const api = find(apis.types, { id: componentData.component.api.id }) as
          | IInterfaceTypeDTO
          | undefined

        if (!api) {
          throw new Error('Missing api')
        }

        const apiFields = filter(apis.fields, {
          api: { id: componentData.component.api.id },
        })

        const { fields = [], types } = await exportAdminTypes({
          apiFields,
          apiId: componentData.component.api.id,
        })

        return {
          component: componentData.component,
          descendantElements: componentData.descendantElements,
          fields,
          types,
        }
      }),
    )
  }

  async exportComponent(id: string) {
    const componentsData = await this.extractComponentsData({ id })

    if (!componentsData.length) {
      throw new Error(`Component with id ${id} not found`)
    }

    return componentsData[0]
  }

  saveComponentAsFile(componentData: IComponentExportData) {
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
