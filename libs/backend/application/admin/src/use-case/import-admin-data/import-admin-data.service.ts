import type {
  IAdminDataExport,
  IAtomExport,
  IComponentExportData,
  ITypesExport,
} from '@codelab/backend/abstract/core'
import { UseCase } from '@codelab/backend/application/service'
import { createComponents } from '@codelab/backend/domain/app'
import { AtomRepository } from '@codelab/backend/domain/atom'
import { importElementInitial } from '@codelab/backend/domain/element'
import { TagRepository } from '@codelab/backend/domain/tag'
import {
  FieldRepository,
  InterfaceTypeRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import type {
  IAuth0Owner,
  ITagDTO,
  ITypeDTO,
} from '@codelab/shared/abstract/core'
import { withTracing } from '@codelab/shared/infra/otel'
import { InjectQueue } from '@nestjs/bull'
import { Inject, Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import fs from 'fs'
import pick from 'lodash/pick'
import path from 'path'
import { DataPaths } from '../../data-paths'

/**
 * During `save`, we'll want to replace the owner with the current
 */
@Injectable()
export class ImportAdminDataService extends UseCase<IAuth0Owner, void> {
  tagRepository = new TagRepository()

  atomRepository = new AtomRepository()

  fieldRepository = new FieldRepository()

  interfaceTypeRepository = new InterfaceTypeRepository()

  dataPaths: DataPaths

  exportedAdminData: IAdminDataExport

  // @InjectQueue('import-admin-data') private importQueue?: Queue,
  constructor(
    // Allow base directory override for testing purpose
    @Inject('DATA_PATH') private readonly DATA_PATH: string,
  ) {
    super()
    this.dataPaths = new DataPaths(this.DATA_PATH)
    this.exportedAdminData = this.getMergedData
  }

  protected async _execute(owner: IAuth0Owner) {
    /**
     * System types must be seeded first, so other types can reference it
     */
    await withTracing('this.importSystemTypes()', () =>
      this.importSystemTypes(owner),
    )()

    await withTracing('this.importTags()', () =>
      this.tagRepository.seedTags(this.exportedAdminData.tags, owner),
    )()

    await withTracing('this.importAtoms()', async (span) => {
      await this.importAtoms(owner)
      span.end()
    })()

    await withTracing('this.importComponents()', () =>
      this.importComponents(owner),
    )()
  }

  private async importSystemTypes(owner: IAuth0Owner) {
    const { types } = JSON.parse(
      fs.readFileSync(this.dataPaths.SYSTEM_TYPES_FILE_PATH, 'utf8'),
    ) as ITypesExport

    for await (const type of types) {
      // const data: ITypeDTO = { ...type, owner }

      // const job = await this.importQueue.add(data)
      await TypeFactory.save({ ...type, owner })
    }
  }

  private async importAtoms(owner: IAuth0Owner) {
    for await (const atomData of this.exportedAdminData.atoms) {
      await withTracing(
        'import-atom',
        () => this.importAtom(atomData, owner),
        (span) => {
          const attributes = pick(atomData.atom, ['name'])
          span.setAttributes(attributes)
        },
      )()
    }
  }

  private async importAtom(
    { api, atom, fields, types }: IAtomExport,
    owner: IAuth0Owner,
  ) {
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

    const componentFilenames = fs.existsSync(this.dataPaths.COMPONENTS_PATH)
      ? fs
          .readdirSync(this.dataPaths.COMPONENTS_PATH)
          .filter((filename) => path.extname(filename) === '.json')
      : []

    // Tag data is all in single file
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
