import type { ExistingData, ITypeExport } from '@codelab/backend/abstract/core'
import { fieldRepository } from '@codelab/backend/application'
import type { ICreateFieldDTO } from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { logSection } from '../../shared/utils/log-task'

export const importFields = async (createFieldsDTO: Array<ICreateFieldDTO>) => {
  logSection('Import Fields')

  for await (const field of createFieldsDTO) {
    // logger.info('Upsert Field', { field })

    await fieldRepository.upsertField(
      {
        input: {
          id: field.id,
          name: field.name,
          key: field.key,
          description: field.description,
        },
        interfaceTypeId: field.interfaceTypeId,
        fieldTypeId: field.fieldType,
      },
      () => ({
        AND: [
          {
            key: field.key,
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
): Array<ICreateFieldDTO> => {
  return types.reduce<Array<ICreateFieldDTO>>((data, type) => {
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

        const createFieldDTO: ICreateFieldDTO = {
          id: existingField ? existingField.id : field.id,
          name: field.name,
          description: field.description,
          key: field.key,
          /**
           * Fields are imported last, so they should exist, but throw error if haven't
           */
          fieldType: existingFieldType.id,
          defaultValues: field.defaultValues,
          interfaceTypeId: type.id,
        }

        return createFieldDTO
      })

      return [...data, ...fields]
    }

    return data
  }, [])
}
