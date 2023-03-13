import type { ExistingData, ITypeExport } from '@codelab/backend/abstract/core'
import { fieldRepository } from '@codelab/backend/domain/type'
import type { ICreateFieldData } from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { logSection, logTask } from '@codelab/shared/utils'

export const importFields = async (
  createFieldsDTO: Array<ICreateFieldData>,
) => {
  logSection('Import Fields')

  for await (const field of createFieldsDTO) {
    // logger.info('Upsert Field', { field })
    logTask('Upsert Field', field.key, field)

    await fieldRepository.upsertField(
      {
        fieldTypeId: field.fieldType,
        input: {
          description: field.description,
          id: field.id,
          key: field.key,
          name: field.name,
        },
        interfaceTypeId: field.interfaceTypeId,
      },
      () => ({
        AND: [
          {
            key: field.key,
          },
          {
            api: { id: field.interfaceTypeId },
          },
          // {
          //   fieldTypeConnection: {
          //     node: {
          //       id: existingType.existingId,
          //     },
          //   },
          // },
        ],
      }),
    )
  }
}

/**
 * We resolve the id here with existing data
 */
export const createImportFieldsData = (
  types: Array<ITypeExport>,
  existingData: ExistingData,
): Array<ICreateFieldData> => {
  return types.reduce<Array<ICreateFieldData>>((data, type) => {
    /**
     * Only deal with interfaces here, since we want the fields
     */
    if (type.__typename === ITypeKind.InterfaceType) {
      const fields = type.fields.map((field) => {
        const existingFieldType = existingData.types[field.fieldType.name]
        const existingField = existingData.fields[`${type.name}-${field.key}`]

        if (!existingFieldType) {
          throw new Error('Field Type should exist')
        }

        const createFieldDTO: ICreateFieldData = {
          defaultValues: field.defaultValues,

          description: field.description,

          /**
           * Fields are imported last, so they should exist, but throw error if haven't
           */
          fieldType: existingFieldType.id,

          id: existingField ? existingField.id : field.id,

          interfaceTypeId: type.id,
          key: field.key,
          name: field.name,
        }

        return createFieldDTO
      })

      return [...data, ...fields]
    }

    return data
  }, [])
}
