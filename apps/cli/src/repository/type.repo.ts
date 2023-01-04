import type { ITypeExport } from '@codelab/backend/abstract/core'
import {
  exportEnumTypeSelectionSet,
  Repository,
} from '@codelab/backend/infra/adapter/neo4j'
import { ITypeKind } from '@codelab/shared/abstract/core'
import type { BaseUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { connectNode, makeAllowedValuesNodeInput } from '@codelab/shared/data'
import { cLog } from '@codelab/shared/utils'
import omit from 'lodash/omit'
import { v4 } from 'uuid'
import { logTask } from '../shared/utils/log-task'

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
  owner: connectNode(userId),
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
      const PrimitiveType = await Repository.instance.PrimitiveType

      const primitiveType = (
        await PrimitiveType.find({
          where: where(type),
        })
      )[0]

      if (!primitiveType) {
        console.log(`Creating ${type.name} [${type.kind}]...`)

        try {
          return (
            await PrimitiveType.create({
              input: [
                {
                  ...createCreateBaseFields(type, userId),
                  primitiveKind: type.primitiveKind,
                },
              ],
            })
          ).primitiveTypes[0]
        } catch (e) {
          console.error(e)
          throw new Error('Create primitive failed')
        }
      }

      console.log(`Updating ${type.name} [${type.kind}]...`)

      cLog(createUpdateBaseFields(type, userId))

      return (
        await PrimitiveType.update({
          where: where(type),
          update: createUpdateBaseFields(type, userId),
        })
      ).primitiveTypes[0]
    }

    case ITypeKind.ActionType: {
      const ActionType = await Repository.instance.ActionType

      const actionType = (
        await ActionType.find({
          where: where(type),
        })
      )[0]

      if (!actionType) {
        console.log(`Creating ${type.name} [${type.kind}]...`)

        return (
          await ActionType.create({
            input: [
              {
                ...createCreateBaseFields(type, userId),
              },
            ],
          })
        ).actionTypes[0]
      }

      return actionType
    }

    case ITypeKind.RenderPropsType: {
      const RenderPropsType = await Repository.instance.RenderPropsType

      const renderPropsType = (
        await RenderPropsType.find({
          where: where(type),
        })
      )[0]

      if (!renderPropsType) {
        console.log(`Creating ${type.name} [${type.kind}]...`)

        return (
          await RenderPropsType.create({
            input: [
              {
                ...createCreateBaseFields(type, userId),
              },
            ],
          })
        ).renderPropsTypes[0]
      }

      return renderPropsType
    }

    case ITypeKind.ReactNodeType: {
      const ReactNodeType = await Repository.instance.ReactNodeType

      const reactNodeType = (
        await ReactNodeType.find({
          where: where(type),
        })
      )[0]

      if (!reactNodeType) {
        console.log(`Creating ${type.name} [${type.kind}]...`)

        return (
          await ReactNodeType.create({
            input: [
              {
                ...createCreateBaseFields(type, userId),
              },
            ],
          })
        ).reactNodeTypes[0]
      }

      return reactNodeType
    }

    case ITypeKind.EnumType: {
      const EnumType = await Repository.instance.EnumType

      const enumType = (
        await EnumType.find({
          where: where(type),
          selectionSet: exportEnumTypeSelectionSet,
        })
      )[0]

      if (!enumType) {
        console.log(`Creating ${type.name} [${type.kind}]...`)

        return (
          await EnumType.create({
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
        ).enumTypes[0]
      }

      console.log(`Updating ${type.name} [${type.kind}]...`, enumType)

      return (
        await EnumType.update({
          where: where(type),
          update: {
            ...createUpdateBaseFields(type, userId),
            allowedValues: type.allowedValues.map((enumTypeValue) => {
              const existingAllowedValue = enumType.allowedValues.find(
                (x) => x.key === enumTypeValue.key,
              )

              return {
                where: {
                  node: {
                    // This shouldn't happen, unless the enums went missing
                    id: existingAllowedValue?.id ?? v4(),
                  },
                },
                update: {
                  node: {
                    ...omit(makeAllowedValuesNodeInput(enumTypeValue), 'id'),
                  },
                },
              }
            }),
          },
        })
      ).enumTypes[0]
    }

    case ITypeKind.InterfaceType: {
      const InterfaceType = await Repository.instance.InterfaceType

      const interfaceType = (
        await InterfaceType.find({
          where: where(type),
        })
      )[0]

      /**
       * First create the interface
       */
      if (!interfaceType) {
        logTask(`Create Interface ${type.kind}`, type.name)

        return (
          await InterfaceType.create({
            input: [
              {
                ...createCreateBaseFields(type, userId),
              },
            ],
          })
        ).interfaceTypes[0]
      }

      return interfaceType
    }
  }

  return
}
