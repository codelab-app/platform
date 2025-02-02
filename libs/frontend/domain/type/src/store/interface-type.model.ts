import type {
  IFieldModel,
  IInterfaceTypeModel,
  ITypeTransformContext,
  JsonSchema,
} from '@codelab/frontend/abstract/domain'
import type {
  IInterfaceTypeDto,
  IPropData,
  IRef,
} from '@codelab/shared/abstract/core'
import type { InterfaceTypeDeleteInput } from '@codelab/shared/infra/gqlgen'
import type { Ref } from 'mobx-keystone'

import { fieldRef, userRef } from '@codelab/frontend/abstract/domain'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { createInterfaceTypeName } from '@codelab/shared-domain-module/type'
import { computed } from 'mobx'
import {
  ExtendedModel,
  model,
  modelAction,
  objectMap,
  prop,
} from 'mobx-keystone'
import { mergeDeep } from 'remeda'

import { sortFieldsArray } from '../shared'
import { createBaseType } from './base-type.model'

const create = ({
  fields,
  id,
  name,
  owner,
}: IInterfaceTypeDto): InterfaceType => {
  // assertIsTypeKind(kind, ITypeKind.InterfaceType)

  const interfaceType = new InterfaceType({
    id,
    kind: ITypeKind.InterfaceType,
    name,
    owner: userRef(owner.id),
  })

  interfaceType.writeFieldCache(fields)

  return interfaceType
}

@model('@codelab/InterfaceType')
export class InterfaceType
  extends ExtendedModel(createBaseType(ITypeKind.InterfaceType), {
    _fields: prop(() => objectMap<Ref<IFieldModel>>()),
  })
  implements IInterfaceTypeModel
{
  static create = create

  static createName = createInterfaceTypeName

  static toDeleteInput(): InterfaceTypeDeleteInput {
    return {
      fields: [
        {
          delete: {},
          where: {},
        },
      ],
    }
  }

  @computed
  get defaultValues(): IPropData {
    // do not omit undefined values
    // object keys length is used for cache busting in runtimeStore.state
    return this.fields
      .map((field) => ({ [field.key]: field.defaultValues ?? undefined }))
      .reduce<IPropData>((acc, cur) => mergeDeep(acc, cur), {})
  }

  @computed
  get fields() {
    const fields = [...this._fields.values()].map((field) => field.current)

    return sortFieldsArray(fields)
  }

  @computed
  get fieldsTree() {
    return this.fields.map((field) => {
      return {
        children:
          field.type.maybeCurrent?.kind === ITypeKind.InterfaceType
            ? field.type.maybeCurrent.fieldsTree
            : [],
        extraData: {
          node: field,
          type: 'field' as const,
        },
        key: field.id,
        primaryTitle: field.key,
        secondaryTitle:
          field.type.maybeCurrent?.kind === ITypeKind.PrimitiveType
            ? field.type.maybeCurrent.name
            : field.type.maybeCurrent?.kind,
        title: `${field.key} (${field.type.maybeCurrent?.kind})`,
      }
    })
  }

  @modelAction
  writeCache(interfaceTypeDto: IInterfaceTypeDto) {
    super.writeCache(interfaceTypeDto)

    this.writeFieldCache(interfaceTypeDto.fields)

    return this
  }

  @modelAction
  writeFieldCache(fields: Array<IRef> = []) {
    for (const field of fields) {
      this._fields.set(field.id, fieldRef(field.id))
    }
  }

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    return {
      properties: this.fields.reduce(
        (all, field) => ({
          ...all,
          [field.key]: field.toJsonSchema({
            defaultValues: field.defaultValues,
            fieldName: field.key,
            uniformSchema: context.uniformSchema,
            validationRules: field.validationRules,
          }),
        }),
        {},
      ),
      required: this.fields
        .map((field) =>
          field.validationRules?.general?.nullable === false
            ? field.key
            : undefined,
        )
        .filter(Boolean) as Array<string>,
      type: 'object',
    }
  }
}
