import type {
  IAdminDataExport,
  IAtomExport,
  IComponentExportData,
  ITypesExport,
} from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import { createComponents } from '@codelab/backend/domain/app'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { importElementInitial } from '@codelab/backend/domain/element'
import { TagRepository } from '@codelab/backend/domain/tag'
import {
  FieldRepository,
  InterfaceTypeRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import type { IAuth0Owner, ITagDTO } from '@codelab/shared/abstract/core'
import {
  IMPORT_SYSTEM_TYPES_SPAN,
  IMPORT_TRACER,
  withTracing,
} from '@codelab/shared/infra/otel'
import { context, trace } from '@opentelemetry/api'
import fs from 'fs'
import path from 'path'
import { DataPaths } from '../../data-paths'

/**
 * During `save`, we'll want to replace the owner with the current
 */
export class ImportAdminDataService extends IUseCase<IAuth0Owner, void> {
  tagRepository = new TagRepository()

  atomRepository = new AtomRepository()

  fieldRepository = new FieldRepository()

  interfaceTypeRepository = new InterfaceTypeRepository()

  dataPaths: DataPaths

  exportedAdminData: IAdminDataExport

  constructor(
    // Allow base directory override for testing purpose
    DATA_PATH = path.resolve('./data/export'),
  ) {
    super()
    this.dataPaths = new DataPaths(DATA_PATH)
    this.exportedAdminData = this.getMergedData
  }

  protected async _execute(owner: IAuth0Owner) {
    /**
     * System types must be seeded first, so other types can reference it
     */
    await withTracing('import-system-types', () =>
      this.importSystemTypes(owner),
    )

    // await this.importTags(owner)

    // await this.importAtoms(owner)

    // await this.importComponents(owner)
  }

  private async importSystemTypes(owner: IAuth0Owner) {
    const { types } = JSON.parse(
      fs.readFileSync(this.dataPaths.SYSTEM_TYPES_FILE_PATH, 'utf8'),
    ) as ITypesExport

    for await (const type of types) {
      await TypeFactory.save({ ...type, owner })
    }
  }

  private async importAtoms(owner: IAuth0Owner) {
    for await (const { api, atom, fields, types } of this.exportedAdminData
      .atoms) {
      // C reate types first so they can be referenced
      for await (const type of types) {
        await TypeFactory.save({ ...type, owner })
      }

      // T hen api's
      await TypeFactory.save({ ...api, owner })

      // F inally fields
      for await (const field of fields) {
        await this.fieldRepository.save(field)
      }

      await this.atomRepository.save({ ...atom, owner })
    }
  }

  private async importTags(owner: IAuth0Owner) {
    for await (const tag of this.exportedAdminData.tags) {
      await this.tagRepository.save({ ...tag, owner })
    }
  }

  async importComponents(owner: IAuth0Owner) {
    const componentsExportData = this.exportedAdminData.components

    for await (const {
      descendantElements,
      fields,
      types,
    } of componentsExportData) {
      for await (const type of types) {
        await TypeFactory.save({ ...type, owner })
      }

      for await (const field of fields) {
        await this.fieldRepository.save(field)
      }

      for await (const element of descendantElements) {
        await importElementInitial(element)
      }
    }

    const components = componentsExportData.map((item) => item.component)
    await createComponents(components, owner)
  }

  /**
   * Extract all the api's from atom file
   */
  get getMergedData(): IAdminDataExport {
    const atomFilenames = fs
      .readdirSync(this.dataPaths.ATOMS_PATH)
      .filter((filename) => path.extname(filename) === '.json')

    const componentFilenames = fs
      .readdirSync(this.dataPaths.COMPONENTS_PATH)
      .filter((filename) => path.extname(filename) === '.json')

    // T ag data is all in single file
    const tags = JSON.parse(
      fs.readFileSync(this.dataPaths.TAGS_FILE_PATH, 'utf8'),
    ) as Array<ITagDTO>

    const systemTypes = JSON.parse(
      fs.readFileSync(this.dataPaths.SYSTEM_TYPES_FILE_PATH, 'utf8'),
    ) as ITypesExport

    const components = componentFilenames.map((filename) => {
      const content = fs.readFileSync(
        path.resolve(this.dataPaths.COMPONENTS_PATH, filename),
        'utf8',
      )

      return JSON.parse(content) as IComponentExportData
    })

    return atomFilenames.reduce(
      (adminData, filename) => {
        const content = fs.readFileSync(
          `${this.dataPaths.ATOMS_PATH}/${filename}`,
          'utf8',
        )

        const atomExport = JSON.parse(content.toString()) as IAtomExport

        adminData.atoms.push(atomExport)

        return adminData
      },
      { atoms: [] as Array<IAtomExport>, components, systemTypes, tags },
    )
  }
}
