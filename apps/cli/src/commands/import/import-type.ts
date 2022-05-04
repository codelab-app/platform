import {
  EnumTypeOGM,
  InterfaceTypeOGM,
  PrimitiveTypeOGM,
} from '@codelab/backend'
import {
  ICreateTypeDTO,
  ITypeExport,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { connectId } from '@codelab/shared/data'
import { cLog } from '@codelab/shared/utils'

export const importType = async (
  types: Array<ITypeExport>,
  auth0Id: string,
) => {
  for (const type of types) {
    console.log(`Upserting ${type.name}:`)
    cLog(type)
    console.log('\n')
    await upsertTypeOgm(type)
  }
}

export const upsertTypeOgm = async (data: ITypeExport) => {
  switch (data.__typename) {
    case ITypeKind.PrimitiveType: {
      const PrimitiveType = await PrimitiveTypeOGM()

      if (!data.primitiveKind) {
        throw new Error('Missing primitiveKind')
      }

      const exists = await PrimitiveType.find({
        where: {
          id: data.id,
        },
      })

      if (!exists) {
        console.log(`Creating ${data.name} [${data.kind}]...`)

        return await PrimitiveType.create({
          input: [
            {
              ...data,
              owner: connectId(data.owner.id),
              primitiveKind: data.primitiveKind,
            },
          ],
        })
      }

      console.log(`Updating ${data.name} [${data.kind}]...`)

      return await PrimitiveType.update({
        where: {
          id: data.id,
        },
        update: {
          name: data.name,
          owner: connectId(data.owner.id),
        },
      })
    }

    case ITypeKind.EnumType: {
      const EnumType = await EnumTypeOGM()

      const exists = await EnumType.find({
        where: {
          id: data.id,
        },
      })

      if (!exists) {
        console.log(`Creating ${data.name} [${data.kind}]...`)

        return EnumType.create({
          input: [
            {
              ...data,
              owner: connectId(data.owner.id),
              allowedValues: {
                create: data.allowedValues?.map((value) => ({
                  node: {
                    id: value.id,
                    name: value.name,
                    value: value.value,
                  },
                })),
              },
            },
          ],
        })
      }

      console.log(`Updating ${data.name} [${data.kind}]...`)

      return EnumType.update({
        where: {
          id: data.id,
        },
        update: {
          ...data,
          owner: connectId(data.owner.id),
          allowedValues: data.allowedValues?.map((value) => ({
            update: {
              node: {
                id: value.id,
                name: value.name,
                value: value.value,
              },
            },
          })),
        },
      })
    }

    case ITypeKind.InterfaceType: {
      const InterfaceType = await InterfaceTypeOGM()

      const exists = await InterfaceType.find({
        where: {
          id: data.id,
        },
      })

      /**
       * First create the interface
       */
      if (!exists) {
        console.log(`Creating ${data.name} [${data.kind}]...`)

        return await InterfaceType.create({
          input: [
            {
              id: data.id,
              name: data.name,
              kind: data.kind,
              owner: connectId(data.owner.id),
            },
          ],
        })
      }

      /**
       * For handling fields, we first disconnect everything
       */
      console.log(`Disconnect all fields for ${data.name}`)

      await InterfaceType.update({
        where: {
          id: data.id,
        },
        update: {
          name: data.name,
          owner: connectId(data.owner.id),
          fields: [
            {
              disconnect: [
                {
                  // https://neo4j.com/docs/graphql-manual/current/mutations/delete/#_nested_delete
                  // Need to check if disconnect works the same
                  where: {},
                },
              ],
            },
          ],
        },
      })

      /**
       * Then connect everything again
       */
      console.log(`Connecting fields for ${data.name}`)

      const update = {
        name: data.name,
        owner: connectId(data.owner.id),
        fields: [
          {
            connect: data.fieldsConnection.edges.map((edge) => ({
              where: {
                node: {
                  id: edge.node.id,
                },
              },
              edge,
            })),
          },
        ],
      }

      console.log(update)

      return InterfaceType.update({
        where: {
          id: data.id,
        },
        update,
      })
    }
  }

  return
}
