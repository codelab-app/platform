import { InterfaceTypeOGM } from '@codelab/backend'
import { IAtomExport, ICreateFieldDTO } from '@codelab/shared/abstract/core'

export const upsertField = async (
  atom: IAtomExport,
  fields: Array<ICreateFieldDTO>,
) => {
  const InterfaceType = await InterfaceTypeOGM()

  // Disconnect all
  await InterfaceType.update({
    where: {
      id: atom?.api?.id,
    },
    disconnect: {},
  })

  // Connect fields
  await InterfaceType.update({
    where: {
      id: atom?.api?.id,
    },
    connect: {
      fields: fields?.map((field) => ({
        edge: {
          id: field.id,
          key: field.key,
          name: field.name,
          description: field.description,
        },
        where: {
          node: {
            id: field.fieldType,
          },
        },
      })),
    },
  })
}
