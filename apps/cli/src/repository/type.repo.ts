import {
  EnumTypeOGM,
  InterfaceTypeOGM,
  PrimitiveTypeOGM,
  ReactNodeTypeOGM,
  RenderPropsTypeOGM,
} from '@codelab/backend/adapter/neo4j'
import { fieldRepository } from '@codelab/backend/application'
import { ITypeExport, ITypeKind } from '@codelab/shared/abstract/core'
import { connectTypeId, makeAllowedValuesNodeInput } from '@codelab/shared/data'
import { omit } from 'lodash'

const createCreateBaseFields = (data: ITypeExport, selectedUser: string) => ({
  id: data.id,
  ...createUpdateBaseFields(data, selectedUser),
})

/**
 * During update we don't want to change the ID
 */
const createUpdateBaseFields = (data: ITypeExport, selectedUser: string) => ({
  name: data.name,
  kind: data.kind,
  owner: connectTypeId(selectedUser),
})

export type BaseUniqueWhere =
  | {
      id: string
    }
  | {
      name: string
    }

/**
 * For import/export we require ID
 *
 * For parsing we require name, since this generates new data and could replace old data
 */
export const upsertType = async (
  data: ITypeExport,
  selectedUser: string,
  where: BaseUniqueWhere,
) => {
  switch (data.__typename) {
    case ITypeKind.PrimitiveType: {
      const PrimitiveType = await PrimitiveTypeOGM()

      if (!data.primitiveKind) {
        throw new Error('Missing primitiveKind')
      }

      const exists = await PrimitiveType.find({
        where,
      })

      if (!exists.length) {
        console.log(`Creating ${data.name} [${data.kind}]...`)

        return await PrimitiveType.create({
          input: [
            {
              ...createCreateBaseFields(data, selectedUser),
              primitiveKind: data.primitiveKind,
            },
          ],
        })
      }

      console.log(`Updating ${data.name} [${data.kind}]...`)

      return await PrimitiveType.update({
        where,
        update: createUpdateBaseFields(data, selectedUser),
      })
    }

    case ITypeKind.RenderPropsType: {
      const RenderPropsType = await RenderPropsTypeOGM()

      const exists = await RenderPropsType.find({
        where,
      })

      if (!exists.length) {
        console.log(`Creating ${data.name} [${data.kind}]...`)

        return await RenderPropsType.create({
          input: [
            {
              ...createCreateBaseFields(data, selectedUser),
            },
          ],
        })
      }

      return
    }

    case ITypeKind.ReactNodeType: {
      const ReactNodeType = await ReactNodeTypeOGM()

      const exists = await ReactNodeType.find({
        where,
      })

      if (!exists.length) {
        console.log(`Creating ${data.name} [${data.kind}]...`)

        return await ReactNodeType.create({
          input: [
            {
              ...createCreateBaseFields(data, selectedUser),
            },
          ],
        })
      }

      return
    }

    case ITypeKind.EnumType: {
      const EnumType = await EnumTypeOGM()

      const exists = await EnumType.find({
        where,
      })

      if (!exists.length) {
        console.log(`Creating ${data.name} [${data.kind}]...`)

        return EnumType.create({
          input: [
            {
              ...createCreateBaseFields(data, selectedUser),
              allowedValues: {
                create: data.allowedValues.map((value) => ({
                  node: makeAllowedValuesNodeInput(value),
                })),
              },
            },
          ],
        })
      }

      console.log(`Updating ${data.name} [${data.kind}]...`)

      return EnumType.update({
        where,
        update: {
          ...createCreateBaseFields(data, selectedUser),
          allowedValues: data.allowedValues.map((value) => ({
            update: {
              node: omit(makeAllowedValuesNodeInput(value), 'id'),
            },
          })),
        },
      })
    }

    case ITypeKind.InterfaceType: {
      const InterfaceType = await InterfaceTypeOGM()

      const exists = await InterfaceType.find({
        where,
      })

      /**
       * First create the interface
       */
      if (!exists.length) {
        console.log(`Creating ${data.name} [${data.kind}]...`)

        await InterfaceType.create({
          input: [
            {
              ...createCreateBaseFields(data, selectedUser),
            },
          ],
        })
      }

      /**
       * For handling fields, we first disconnect everything
       */
      console.log(`Disconnect all fields for ${data.name}`)

      await InterfaceType.update({
        where,
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
