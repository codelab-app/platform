import type { AntDesignField } from '@codelab/backend/abstract/core'
import { IAuthUseCase, IUseCase } from '@codelab/backend/abstract/types'
import {
  antdAtomData,
  atomTypeKeyByFileName,
  SeedAtomsService,
} from '@codelab/backend/application/atom'
import { AtomRepository } from '@codelab/backend/domain/atom'
import {
  Field,
  FieldRepository,
  InterfaceTypeRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import type {
  IAtomDTO,
  IAuth0Owner,
  IFieldDTO,
} from '@codelab/frontend/abstract/core'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import merge from 'lodash/merge'
import { v4 } from 'uuid'
import { TransformAntDesignTypesService } from '../transform-ant-design-types/transform-ant-design-types.service'
import { readCsvFiles } from './read-csv-files'

/**
 * Here we want to parse the CSV files from Ant Design and seed it as atoms
 *
 * We don't map the existing ids here
 */
export class ExtractAntDesignFieldsService extends IAuthUseCase<
  Array<IAtomDTO>,
  Array<IFieldDTO>
> {
  private antdDataFolder = `${process.cwd()}/data/antd/`

  private reactDataFolder = `${process.cwd()}/data/react/`

  fieldRepository: FieldRepository = new FieldRepository()

  /**
   * Extract data to be used for seeding, these data have already been mapped with correct ID for upsert
   */
  protected async _execute(atoms: Array<IAtomDTO>) {
    const atomsByName = atoms
      .map((atom) => ({
        [atom.name]: atom,
      }))
      .reduce(merge, {})

    const antdCsvData = await readCsvFiles(this.antdDataFolder)
    const reactCsvData = await readCsvFiles(this.reactDataFolder)
    const csvFieldsByFile = { ...antdCsvData, ...reactCsvData }

    /**
     * Break down function to act on each file
     */
    return await Object.entries(csvFieldsByFile).reduce(
      async (accFieldsPromise, [file, antDesignFields]) => {
        const accFields = await accFieldsPromise
        const atomName = file.replace('.csv', '')
        const atomType = atomTypeKeyByFileName[atomName]

        if (!atomType) {
          return accFields
        }

        // Could optimize by passing in existing data map
        const atom = atomsByName[atomType]

        if (!atom) {
          return accFields
        }

        const fields = await this.transformFields(atom, antDesignFields)

        return [...accFields, ...fields]
      },
      Promise.resolve([] as Array<IFieldDTO>),
    )
  }

  private async transformFields(
    atom: IAtomDTO,
    atomFields: Array<AntDesignField>,
  ) {
    return await atomFields.reduce<Promise<Array<IFieldDTO>>>(
      async (accFields, field) => {
        const existingOrNewField = await this.createOrUpdateField(atom, field)

        if (!existingOrNewField) {
          return [...(await accFields)]
        }

        return [...(await accFields), existingOrNewField]
      },
      Promise.resolve([]),
    )
  }

  private async createOrUpdateField(
    atom: IAtomDTO,
    field: AntDesignField,
  ): Promise<IFieldDTO | undefined> {
    const existingField = await this.fieldRepository.findOne({
      api: {
        id: atom.api.id,
      },
      key: field.property,
    })

    if (existingField) {
      return existingField
    }

    const fieldTypeDTO = await new TransformAntDesignTypesService().execute({
      atom,
      field,
      owner: this.owner,
    })

    if (!fieldTypeDTO) {
      return undefined
    }

    const type = await TypeFactory.create(
      {
        ...fieldTypeDTO,
        owner: this.owner,
      },
      { name: fieldTypeDTO.name },
    )

    if (!type) {
      throw new Error('Error creating type')
    }

    return Field.create({
      api: { id: atom.api.id },
      defaultValues: null,
      description: field.description,
      fieldType: type,
      id: v4(),
      key: field.property,
      name: compoundCaseToTitleCase(field.property),
    })
  }
}
