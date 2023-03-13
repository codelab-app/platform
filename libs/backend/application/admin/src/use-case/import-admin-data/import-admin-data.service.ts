import type {
  ExportedAdminData,
  ExportedAtom,
  ITag,
  ITypeExport,
} from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { TagRepository } from '@codelab/backend/domain/tag'
import {
  FieldRepository,
  InterfaceTypeRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import type { IAuth0Owner } from '@codelab/frontend/abstract/core'
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

  constructor(
    // Allow base directory override for testing purpose
    DATA_EXPORT_PATH = path.resolve('./data/export'),
  ) {
    super()
    this.dataPaths = new DataPaths(DATA_EXPORT_PATH)
  }

  protected async _execute(owner: IAuth0Owner) {
    /**
     * Type must be seeded first, so atom can reference it
     */
    await this.importSystemTypes(owner)

    await this.importAdminTypes(owner)

    await this.importApis(owner)

    // await this.importTags(owner)

    // const apis = await this.interfaceTypeRepository.all()
    // console.log(apis)

    await this.importFields(owner)

    await this.importAtoms(owner)
  }

  private async importSystemTypes(owner: IAuth0Owner) {
    const types = JSON.parse(
      fs.readFileSync(this.dataPaths.SYSTEM_TYPES_FILE_PATH, 'utf8'),
    ) as Array<ITypeExport>

    for await (const type of types) {
      await TypeFactory.create({ ...type, owner })
    }
  }

  private async importAdminTypes(owner: IAuth0Owner) {
    for await (const type of this.getMergedData().types) {
      await TypeFactory.create({ ...type, owner })
    }
  }

  private async importAtoms(owner: IAuth0Owner) {
    for await (const atom of this.getMergedData().atoms) {
      await this.atomRepository.save({ ...atom, owner })
    }
  }

  private async importFields(owner: IAuth0Owner) {
    const fields = this.getMergedData().apis.flatMap((api) => api.fields)

    for await (const field of fields) {
      await this.fieldRepository.save(field)
    }
  }

  private async importTags(owner: IAuth0Owner) {
    const tags = JSON.parse(
      fs.readFileSync(this.dataPaths.TAGS_FILE_PATH, 'utf8'),
    ) as Array<ITag>

    for await (const tag of tags) {
      await this.tagRepository.save({ ...tag, owner })
    }
  }

  private async importApis(owner: IAuth0Owner) {
    for await (const api of this.getMergedData().apis) {
      await TypeFactory.create({ ...api, owner })
    }
  }

  /**
   * Extract all the api's from atom file
   */
  private getMergedData(): Omit<ExportedAdminData, 'tags'> {
    const filenames = fs.readdirSync(this.dataPaths.ATOMS_PATH)

    return filenames.reduce(
      (acc, filename) => {
        const content = fs.readFileSync(
          `${this.dataPaths.ATOMS_PATH}/${filename}`,
          'utf8',
        )

        const { atom, api, types } = JSON.parse(
          content.toString(),
        ) as ExportedAtom

        acc.atoms.push(atom)
        acc.apis.push(api)
        acc.types.push(...types)

        return acc
      },
      { apis: [], atoms: [], types: [] } as Omit<ExportedAdminData, 'tags'>,
    )
  }
}
