import type {
  AntDesignFieldsByFile,
  ExistingData,
  IAtom,
  IAtomImport,
  IField,
  IUserRef,
} from '@codelab/backend/abstract/core'
import { IUseCase } from '@codelab/backend/abstract/types'
import {
  atomTypeKeyByFileName,
  SeedAtomsService,
} from '@codelab/backend/application/atom'
import {
  Field,
  FieldRepository,
  InterfaceType,
  InterfaceTypeRepository,
  TypeFactory,
} from '@codelab/backend/domain/type'
import type { ICreateFieldDTO } from '@codelab/frontend/abstract/core'
import { IPrimitiveTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { compoundCaseToTitleCase } from '@codelab/shared/utils'
import merge from 'lodash/merge'
import { v4 } from 'uuid'
import { readCsvFiles } from './read-csv-files'
// import { upsertFieldType } from '../../repository/type/upsert-field-type'

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

  interfaceTypeRepository: InterfaceTypeRepository =
    new InterfaceTypeRepository()

  private constructor(atoms: Array<IAtom>) {
    super()
    this.atoms = atoms
      .map((atom) => ({
        [atom.name]: atom,
      }))
      .reduce(merge, {})
  }

  static async init(owner: IUserRef) {
    const atoms = await new SeedAtomsService().createAtomsData(owner)

    return new SeedAntDesignFieldsService(atoms)
  }

  /**
   * Extract data to be used for seeding, these data have already been mapped with correct ID for upsert
   */
  async _execute() {
    const antdCsvData = await readCsvFiles(this.antdDataFolder)
    const reactCsvData = await readCsvFiles(this.reactDataFolder)
    const csvData = { ...antdCsvData, ...reactCsvData }
    const fields = this.transform(csvData)

    await Promise.all(
      (await fields).map((field) => this.fieldRepository.save(field)),
    )
  }

  private async transform(
    fieldsByFile: AntDesignFieldsByFile,
  ): Promise<Array<IField>> {
    const fields: Array<IField> = []

    for (const [file, atomFields] of Object.entries(fieldsByFile)) {
      const atomName = atomTypeKeyByFileName[file.replace('.csv', '')]

      if (!atomName) {
        console.log('Missing atom data for file', file)

        continue
      }

      const atom = (await this.atoms)[atomName]

      if (!atom) {
        console.log('Atom data not found', atomName)

        continue
      }

      const _fields = await atomFields.reduce<Promise<Array<IField>>>(
        async (accFields, field) => {
          const fieldType = await this.fieldRepository.find({
            name: Field.compositeKey(atom.api.name, field.property),
          })

          if (!fieldType) {
            console.log('Field type not found', fieldType)
          }

          const api = await this.interfaceTypeRepository.find({
            name: InterfaceType.getApiName(atom),
          })

          if (!api) {
            throw new Error('Missing api')
          }

          // TODO: Need to create field types that don't exist

          // logger.info('Field Type', {
          //   existingField,
          //   name: `${atom.api.name}-${field.property}`,
          //   fieldType,
          // })

          const innerField: Array<IField> = fieldType
            ? [
                {
                  id: v4(),
                  key: field.property,
                  name: compoundCaseToTitleCase(field.property),
                  description: field.description,
                  // Return empty string for filtering later
                  fieldType,
                  api,
                  // Set default validation rules
                  // validationRules: {
                  //   general: {
                  //     nullable: true,
                  //   },
                  // },
                  defaultValues: null,
                },
              ]
            : []

          return [...(await accFields), ...innerField]
        },
        Promise.resolve([]),
      )

      const filteredFields = _fields.filter((field): field is IField => {
        return Boolean(field.fieldType)
      })

      fields.push(...filteredFields)
    }

    return fields
  }

  static mapPrimitiveType = (value: string) => {
    switch (value) {
      case 'boolean':
        return IPrimitiveTypeKind.Boolean
      case 'string':
        return IPrimitiveTypeKind.String
      case 'ReactNode':
        return ITypeKind.ReactNodeType
      case 'number':
        return IPrimitiveTypeKind.Number
      case 'integer':
        return IPrimitiveTypeKind.Integer
      default:
        console.log(`Type not found: [${value}]`)

        return null
    }
  }
}
