import type {
  IFieldModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import { fieldRef } from '@codelab/frontend/abstract/domain'
import type { InterfaceTypeDeleteInput } from '@codelab/shared/abstract/codegen'
import type { IRef } from '@codelab/shared/abstract/core'
import {
  assertIsTypeKind,
  IInterfaceTypeDto,
  IPropData,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { createInterfaceTypeName } from '@codelab/shared/domain/model'
import compact from 'lodash/compact'
import isNil from 'lodash/isNil'
import merge from 'lodash/merge'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import {
  ExtendedModel,
  model,
  modelAction,
  objectMap,
  prop,
} from 'mobx-keystone'
import { sortFieldsArray } from '../shared'
import { createBaseType } from './base-type.model'

const create = ({
  fields,
  id,
  kind,
  name,
}: IInterfaceTypeDto): InterfaceType => {
  assertIsTypeKind(kind, ITypeKind.InterfaceType)

  const interfaceType = new InterfaceType({
    id,
    kind,
    name,
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
    return compact(
      this.fields.map((field) =>
        !isNil(field.defaultValues)
          ? { [field.key]: field.defaultValues }
          : undefined,
      ),
    ).reduce(merge, {})
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
  writeCache(interfaceTypeDTO: IInterfaceTypeDto) {
    super.writeCache(interfaceTypeDTO)

    this.writeFieldCache(interfaceTypeDTO.fields)

    return this
  }

  @modelAction
  writeFieldCache(fields: Array<IRef>) {
    for (const field of fields) {
      this._fields.set(field.id, fieldRef(field.id))
    }
  }
}
