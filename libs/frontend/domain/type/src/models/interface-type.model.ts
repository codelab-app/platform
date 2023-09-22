import type {
  IAppModel,
<<<<<<< HEAD:libs/frontend/domain/type/src/models/interface-type.model.ts
  IFieldModel,
  IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import { fieldRef } from '@codelab/frontend/abstract/domain'
=======
  IField,
  IInterfaceType,
} from '@codelab/frontend/abstract/core'
import { fieldRef, IPropData } from '@codelab/frontend/abstract/core'
>>>>>>> aac8ffbb6 (wip: renderType getter):libs/frontend/domain/type/src/store/models/interface-type.model.ts
import type {
  InterfaceTypeCreateInput,
  InterfaceTypeDeleteInput,
} from '@codelab/shared/abstract/codegen'
<<<<<<< HEAD:libs/frontend/domain/type/src/models/interface-type.model.ts
import type { IRef } from '@codelab/shared/abstract/core'
=======
>>>>>>> aac8ffbb6 (wip: renderType getter):libs/frontend/domain/type/src/store/models/interface-type.model.ts
import {
  assertIsTypeKind,
  IInterfaceTypeDTO,
  IPropData,
  ITypeKind,
} from '@codelab/shared/abstract/core'
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
import { v4 } from 'uuid'
import { sortFieldsArray } from '../shared'
import { createBaseType } from './base-type.model'

const create = ({
  fields,
  id,
  kind,
  name,
}: IInterfaceTypeDTO): InterfaceType => {
  assertIsTypeKind(kind, ITypeKind.InterfaceType)

  const interfaceType = new InterfaceType({
    id,
    kind,
    name,
  })

  interfaceType.writeFieldCache(fields)

  return interfaceType
}

const createName = (name: string) => {
  return `${name} API`
}

const createApiNode = ({
  name,
}: Pick<IAppModel, 'name'>): InterfaceTypeCreateInput => {
  return {
    id: v4(),
    kind: ITypeKind.InterfaceType,
    name: `${name} Store API`,
  }
}

@model('@codelab/InterfaceType')
export class InterfaceType
  extends ExtendedModel(createBaseType(ITypeKind.InterfaceType), {
    _fields: prop(() => objectMap<Ref<IFieldModel>>()),
  })
  implements IInterfaceTypeModel
{
  static create = create

  static createApiNode = createApiNode

  static createName = createName

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
    return this.fields
      .map((field) => ({ [field.key]: field.defaultValues }))
      .reduce(merge, {})
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
  writeCache(interfaceTypeDTO: IInterfaceTypeDTO) {
    super.writeCache(interfaceTypeDTO)

    this.writeFieldCache(interfaceTypeDTO.fields)

    return this
  }

<<<<<<< HEAD:libs/frontend/domain/type/src/models/interface-type.model.ts
  @modelAction
  writeFieldCache(fields: Array<IRef>) {
    for (const field of fields) {
      this._fields.set(field.id, fieldRef(field.id))
=======
  static createName = createName

  static create = create

  static createApiNode = createApiNode

  static toDeleteInput(): InterfaceTypeDeleteInput {
    return {
      fields: [
        {
          delete: {},
          where: {},
        },
      ],
>>>>>>> aac8ffbb6 (wip: renderType getter):libs/frontend/domain/type/src/store/models/interface-type.model.ts
    }
  }
}
