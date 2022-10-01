import {
  EnumTypeOGM,
  exportEnumTypeSelectionSet,
  InterfaceTypeOGM,
  PrimitiveTypeOGM,
  ReactNodeTypeOGM,
  RenderPropsTypeOGM,
} from '@codelab/backend/adapter/neo4j'
import { ITypeExport, ITypeKind } from '@codelab/shared/abstract/core'
import { BaseUniqueWhereCallback } from '@codelab/shared/abstract/types'
import { connectTypeId, makeAllowedValuesNodeInput } from '@codelab/shared/data'
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

        try {
          return await PrimitiveType.create({
            input: [
              {
                ...createCreateBaseFields(type, userId),
                primitiveKind: type.primitiveKind,
              },
            ],
          })
        } catch (e) {
          console.error(e)
          throw new Error('Create primitive failed')
        }
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

      const enumType = (
        await EnumType.find({
          where: where(type),
          selectionSet: exportEnumTypeSelectionSet,
        })
      )[0]

      if (!enumType) {
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

      console.log(`Updating ${type.name} [${type.kind}]...`, enumType)

      return EnumType.update({
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
        logTask(`Create Interface ${type.kind}`, type.name)

        await InterfaceType.create({
          input: [
            {
              ...createCreateBaseFields(type, userId),
            },
          ],
        })
      }
    }
  }

  return
}
