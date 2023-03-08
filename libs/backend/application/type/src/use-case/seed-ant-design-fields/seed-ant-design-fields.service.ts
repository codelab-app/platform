import type {
  AntDesignField,
  IAtom,
  IField,
  IOwner,
  IType,
} from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import {
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
export class SeedAntDesignFieldsService extends IUseCase<void, void> {
  private antdDataFolder = `${process.cwd()}/data/antd/`

  private reactDataFolder = `${process.cwd()}/data/react/`

  private readonly atoms: { [atomName: string]: IAtom }

  fieldRepository: FieldRepository = new FieldRepository()

  atomRepository: AtomRepository = new AtomRepository()

  interfaceTypeRepository: InterfaceTypeRepository =
    new InterfaceTypeRepository()

  /**
   * @param atoms Created from hard coded atoms data
   */
  private constructor(atoms: Array<IAtom>, private readonly owner: IOwner) {
    super()
    this.atoms = atoms
      .map((atom) => ({
        [atom.name]: atom,
      }))
      .reduce(merge, {})
  }

  static async init(owner: IOwner) {
    const atoms = await new SeedAtomsService().createAtomsData(owner)

    return new SeedAntDesignFieldsService(atoms, owner)
  }

  /**
   * Extract data to be used for seeding, these data have already been mapped with correct ID for upsert
   */
  protected async _execute() {
    const antdCsvData = await readCsvFiles(this.antdDataFolder)
    const reactCsvData = await readCsvFiles(this.reactDataFolder)
    const csvDataByFile = { ...antdCsvData, ...reactCsvData }

    /**
     * Break down function to act on each file
     */
    for await (const [file, antDesignFields] of Object.entries(csvDataByFile)) {
      const atomName = file.replace('.csv', '')
      const atomType = atomTypeKeyByFileName[atomName]

      if (!atomType) {
        continue
      }

      const atom = this.atoms[atomType]

      if (!atom) {
        continue
      }

      const fields = await this.transformFields(atom, antDesignFields)

      for await (const field of fields) {
        await this.fieldRepository.save(field, {
          api: {
            name: atom.api.name,
          },
          key: field.key,
        })
      }
    }
  }

  private async transformFields(
    atom: IAtom,
    atomFields: Array<AntDesignField>,
  ) {
    return await atomFields.reduce<Promise<Array<IField>>>(
      async (accFields, field) => {
        /**
         * Get the existing atom first, these should have already been seeded at this point
         */
        let existingField: IField | undefined = await this.fieldRepository.find(
          {
            api: {
              name: atom.api.name,
            },
            key: field.property,
          },
        )

        /**
         * If field doesn't exist try to create it here
         */
        if (!existingField) {
          /**
           * This is the field type we want from the field, this is a local copy so we'll need to upsert
           */
          const fieldTypeDTO =
            await new TransformAntDesignTypesService().execute({
              atom,
              field,
              owner: this.owner,
            })

          /**
           * If field type can't be transformed by our parser, then we skip it by returning the accumulator
           */
          if (!fieldTypeDTO) {
            return [...(await accFields)]
          }

          /**
           * We need to upsert here by specifying where as name
           */
          const type = await TypeFactory.create(
            fieldTypeDTO,
            this.owner,
            (typeData: IType) => ({ name: typeData.name }),
          )

          existingField = Field.init({
            api: { id: atom.api.id },
            defaultValues: null,
            description: field.description,
            /**
             * Need to get type from the field type
             *
             * If doesn't exist like union or interface we'll need to create it
             */
            fieldType: type,

            id: v4(),

            key: field.property,

            name: compoundCaseToTitleCase(field.property),
          })
        }

        return [...(await accFields), existingField]
      },
      Promise.resolve([]),
    )
  }
}
