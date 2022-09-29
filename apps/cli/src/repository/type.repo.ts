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

const createCreateBaseFields = (data: ITypeExport, selectedUserId: string) => ({
  id: data.id,
  ...createUpdateBaseFields(data, selectedUserId),
})

/**
 * During update we don't want to change the ID
 */
const createUpdateBaseFields = (data: ITypeExport, selectedUserId: string) => ({
  name: data.name,
  kind: data.kind,
  owner: connectTypeId(selectedUserId),
})

/**
 * For import/export we require ID
 *
 * For parsing we require name, since this generates new data and could replace old data
 */
export const upsertType = async (
  data: ITypeExport,
  selectedUserId: string,
  where: BaseUniqueWhereCallback<ITypeExport>,
) => {
  switch (data.__typename) {
    case ITypeKind.PrimitiveType: {
      const PrimitiveType = await PrimitiveTypeOGM()

      if (!data.primitiveKind) {
        throw new Error('Missing primitiveKind')
      }

      const exists = await PrimitiveType.find({
        where: where(data),
      })

      if (!exists.length) {
        console.log(`Creating ${data.name} [${data.kind}]...`)

        return await PrimitiveType.create({
          input: [
            {
              ...createCreateBaseFields(data, selectedUserId),
              primitiveKind: data.primitiveKind,
            },
          ],
        })
      }

      console.log(`Updating ${data.name} [${data.kind}]...`)

      cLog(createUpdateBaseFields(data, selectedUserId))

      return await PrimitiveType.update({
        where: where(data),
        update: createUpdateBaseFields(data, selectedUserId),
      })
    }

    case ITypeKind.RenderPropsType: {
      const RenderPropsType = await RenderPropsTypeOGM()

      const exists = await RenderPropsType.find({
        where: where(data),
      })

      if (!exists.length) {
        console.log(`Creating ${data.name} [${data.kind}]...`)

        return await RenderPropsType.create({
          input: [
            {
              ...createCreateBaseFields(data, selectedUserId),
            },
          ],
        })
      }

      return
    }

    case ITypeKind.ReactNodeType: {
      const ReactNodeType = await ReactNodeTypeOGM()

      const exists = await ReactNodeType.find({
        where: where(data),
      })

      if (!exists.length) {
        console.log(`Creating ${data.name} [${data.kind}]...`)

        return await ReactNodeType.create({
          input: [
            {
              ...createCreateBaseFields(data, selectedUserId),
            },
          ],
        })
      }

      return
    }

    case ITypeKind.EnumType: {
      const EnumType = await EnumTypeOGM()

      const exists = await EnumType.find({
        where: where(data),
      })

      if (!exists.length) {
        console.log(`Creating ${data.name} [${data.kind}]...`)

        return EnumType.create({
          input: [
            {
              ...createCreateBaseFields(data, selectedUserId),
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
        where: where(data),
        update: {
          ...createCreateBaseFields(data, selectedUserId),
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
        where: where(data),
      })

      /**
       * First create the interface
       */
      if (!exists.length) {
        console.log(`Creating ${data.name} [${data.kind}]...`)

        await InterfaceType.create({
          input: [
            {
              ...createCreateBaseFields(data, selectedUserId),
            },
          ],
        })
      }

      /**
       * For handling fields, we first disconnect everything
       */
      console.log(`Disconnect all fields for ${data.name}`)

      await InterfaceType.update({
        where: where(data),
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
