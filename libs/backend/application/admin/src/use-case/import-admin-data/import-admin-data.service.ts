import type {
  IAdminDataExport,
  IAtomExport,
  ITypesExport,
} from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { TagRepository } from '@codelab/backend/domain/tag'
import {
  FieldRepository,
  InterfaceTypeRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import type { IAuth0Owner, ITagDTO } from '@codelab/shared/abstract/core'
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
    await this.importSystemTypes(owner)

    await this.importTags(owner)

    await this.importAtoms(owner)
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
      // Create types first so they can be referenced
      for await (const type of types) {
        await TypeFactory.save({ ...type, owner })
      }

      // Then api's
      await TypeFactory.save({ ...api, owner })

      // Finally fields
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

  /**
   * Extract all the api's from atom file
   */
  get getMergedData(): IAdminDataExport {
    const filenames = fs
      .readdirSync(this.dataPaths.ATOMS_PATH)
      .filter((filename) => path.extname(filename) === '.json')

    // Tag data is all in single file
    const tags = JSON.parse(
      fs.readFileSync(this.dataPaths.TAGS_FILE_PATH, 'utf8'),
    ) as Array<ITagDTO>

    const systemTypes = JSON.parse(
      fs.readFileSync(this.dataPaths.SYSTEM_TYPES_FILE_PATH, 'utf8'),
    ) as ITypesExport

    return filenames.reduce(
      (adminData, filename) => {
        const content = fs.readFileSync(
          `${this.dataPaths.ATOMS_PATH}/${filename}`,
          'utf8',
        )

        const atomExport = JSON.parse(content.toString()) as IAtomExport

        adminData.atoms.push(atomExport)

        return adminData
      },
      { atoms: [] as Array<IAtomExport>, systemTypes, tags },
    )
  }
}
