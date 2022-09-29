import {
  EnumTypeOGM,
  InterfaceTypeOGM,
  PrimitiveTypeOGM,
  ReactNodeTypeOGM,
  RenderPropsTypeOGM,
} from '@codelab/backend/adapter/neo4j'
import { fieldRepository } from '@codelab/backend/application'
import { ITypeExport, ITypeKind } from '@codelab/shared/abstract/core'
import { BaseUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { connectTypeId, makeAllowedValuesNodeInput } from '@codelab/shared/data'
import { cLog } from '@codelab/shared/utils'
import { omit } from 'lodash'

const createCreateBaseFields = (data: ITypeExport, userId: string) => ({
  id: data.id,
  ...createUpdateBaseFields(data, userId),
})

/**
 * During update we don't want to change the ID
 */
const createUpdateBaseFields = (data: ITypeExport, userId: string) => ({
  name: data.name,
  kind: data.kind,
  owner: connectTypeId(userId),
})

/**
 * For import/export we require ID
 *
 * For parsing we require name, since this generates new data and could replace old data
 */
export const upsertType = async (
  type: ITypeExport,
  userId: string,
  where: BaseUniqueWhereCallback<ITypeExport>,
) => {
  switch (type.__typename) {
    case ITypeKind.PrimitiveType: {
      const PrimitiveType = await PrimitiveTypeOGM()

      if (!type.primitiveKind) {
        throw new Error('Missing primitiveKind')
      }

      const exists = await PrimitiveType.find({
        where: where(type),
      })

      if (!exists.length) {
        console.log(`Creating ${type.name} [${type.kind}]...`)

        return await PrimitiveType.create({
          input: [
            {
              ...createCreateBaseFields(type, userId),
              primitiveKind: type.primitiveKind,
            },
          ],
        })
      }

      console.log(`Updating ${type.name} [${type.kind}]...`)

      cLog(createUpdateBaseFields(type, userId))

      return await PrimitiveType.update({
        where: where(type),
        update: createUpdateBaseFields(type, userId),
      })
    }

    case ITypeKind.RenderPropsType: {
      const RenderPropsType = await RenderPropsTypeOGM()

      const exists = await RenderPropsType.find({
        where: where(type),
      })

      if (!exists.length) {
        console.log(`Creating ${type.name} [${type.kind}]...`)

        return await RenderPropsType.create({
          input: [
            {
              ...createCreateBaseFields(type, userId),
            },
          ],
        })
      }

      return
    }

    case ITypeKind.ReactNodeType: {
      const ReactNodeType = await ReactNodeTypeOGM()

      const exists = await ReactNodeType.find({
        where: where(type),
      })

      if (!exists.length) {
        console.log(`Creating ${type.name} [${type.kind}]...`)

        return await ReactNodeType.create({
          input: [
            {
              ...createCreateBaseFields(type, userId),
            },
          ],
        })
      }

      return
    }

    case ITypeKind.EnumType: {
      const EnumType = await EnumTypeOGM()

      const exists = await EnumType.find({
        where: where(type),
      })

      if (!exists.length) {
        console.log(`Creating ${type.name} [${type.kind}]...`)

        return EnumType.create({
          input: [
            {
              ...createCreateBaseFields(type, userId),
              allowedValues: {
                create: type.allowedValues.map((value) => ({
                  node: makeAllowedValuesNodeInput(value),
                })),
              },
            },
          ],
        })
      }

      console.log(`Updating ${type.name} [${type.kind}]...`)

      return EnumType.update({
        where: where(type),
        update: {
          ...createCreateBaseFields(type, userId),
          allowedValues: type.allowedValues.map((value) => ({
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
        where: where(type),
      })

      /**
       * First create the interface
       */
      if (!exists.length) {
        console.log(`Creating ${type.name} [${type.kind}]...`)

        await InterfaceType.create({
          input: [
            {
              ...createCreateBaseFields(type, userId),
            },
          ],
        })
      }

      /**
       * For handling fields, we first disconnect everything
       */
      console.log(`Disconnect all fields for ${type.name}`)

      await InterfaceType.update({
        where: where(type),
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
      console.log(`Connecting fields for ${type.name}`)

      for (const edge of type.fieldsConnection.edges) {
        const args = {
          interfaceTypeId: type.id,
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
