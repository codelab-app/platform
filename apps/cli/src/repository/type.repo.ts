import {
  EnumTypeOGM,
  fieldRepository,
  InterfaceTypeOGM,
  PrimitiveTypeOGM,
  ReactNodeTypeOGM,
  RenderPropsTypeOGM,
} from '@codelab/backend'
import { ITypeExport, ITypeKind } from '@codelab/shared/abstract/core'
import { connectId } from '@codelab/shared/data'

const createBaseFields = (data: ITypeExport, selectedUser: string) => ({
  id: data.id,
  name: data.name,
  kind: data.kind,
  owner: connectId(selectedUser),
})

export const upsertType = async (data: ITypeExport, selectedUser: string) => {
  switch (data.__typename) {
    case ITypeKind.PrimitiveType: {
      const PrimitiveType = await PrimitiveTypeOGM()

      if (!data.primitiveKind) {
        throw new Error('Missing primitiveKind')
      }

      const exists = await PrimitiveType.find({
        where: {
          name: data.name,
        },
      })

      if (!exists.length) {
        console.log(`Creating ${data.name} [${data.kind}]...`)

        return await PrimitiveType.create({
          input: [
            {
              ...createBaseFields(data, selectedUser),
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
          ...createBaseFields(data, selectedUser),
        },
      })
    }

    case ITypeKind.RenderPropsType: {
      const RenderPropsType = await RenderPropsTypeOGM()

      const exists = await RenderPropsType.find({
        where: {
          name: data.name,
        },
      })

      if (!exists.length) {
        console.log(`Creating ${data.name} [${data.kind}]...`)

        return await RenderPropsType.create({
          input: [
            {
              ...createBaseFields(data, selectedUser),
            },
          ],
        })
      }

      return
    }

    case ITypeKind.ReactNodeType: {
      const ReactNodeType = await ReactNodeTypeOGM()

      const exists = await ReactNodeType.find({
        where: {
          name: data.name,
        },
      })

      if (!exists.length) {
        console.log(`Creating ${data.name} [${data.kind}]...`)

        return await ReactNodeType.create({
          input: [
            {
              ...createBaseFields(data, selectedUser),
            },
          ],
        })
      }

      return
    }

    case ITypeKind.EnumType: {
      const EnumType = await EnumTypeOGM()

      const exists = await EnumType.find({
        where: {
          id: data.id,
        },
      })

      if (!exists.length) {
        console.log(`Creating ${data.name} [${data.kind}]...`)

        return EnumType.create({
          input: [
            {
              ...createBaseFields(data, selectedUser),
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
          ...createBaseFields(data, selectedUser),
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
      if (!exists.length) {
        console.log(`Creating ${data.name} [${data.kind}]...`)

        return await InterfaceType.create({
          input: [
            {
              ...createBaseFields(data, selectedUser),
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

      // upsertField()

      for (const edge of data.fieldsConnection.edges) {
        const args = {
          interfaceTypeId: data.id,
          fieldTypeId: edge.node.id,
          field: {
            id: edge.id,
            name: edge.name,
            description: edge.description,
            key: edge.key,
          },
        }

        console.log('Upserting field...', args)

        await fieldRepository.upsertField(args)
      }
    }
  }

  return
}
