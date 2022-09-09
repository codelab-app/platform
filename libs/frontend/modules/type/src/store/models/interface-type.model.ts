import type {
  IFieldProps,
  IInterfaceType,
  IInterfaceTypeDTO,
  ITypeDTO,
} from '@codelab/shared/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  ExtendedModel,
  model,
  modelAction,
  objectMap,
  prop,
} from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createTypeBase } from './base-type.model'
import { Field } from './field.model'

const hydrate = ({
  id,
  kind,
  name,
  fieldsConnection,
  owner,
}: IInterfaceTypeDTO): InterfaceType => {
  assertIsTypeKind(kind, ITypeKind.InterfaceType)

  const interfaceType = new InterfaceType({
    id,
    kind,
    name,
    ownerId: owner.id,
  })

  for (const edge of fieldsConnection.edges) {
    interfaceType.updateFieldCache(edge)
  }

  return interfaceType
}

@model('@codelab/InterfaceType')
export class InterfaceType
  extends ExtendedModel(createTypeBase(ITypeKind.InterfaceType), {
    fields: prop(() => objectMap<Field>()),
  })
  implements IInterfaceType
{
  @computed
  get fieldList() {
    return [...this.fields.values()]
  }

  field(id: string): Field | undefined {
    return this.fields.get(id)
  }

  @modelAction
  updateFieldCache(fragment: IFieldProps): Field {
    const field = Field.hydrate(fragment)

    this.fields.set(field.id, field)

    return field
  }

  @modelAction
  deleteFieldLocal(field: Field) {
    this.fields.delete(field.id)
  }

  @modelAction
  writeCache(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.InterfaceType) {
      throw new Error('Invalid InterfaceType')
    }

    for (const fieldEdge of fragment.fieldsConnection.edges) {
      let field = this.field(fieldEdge.id)

      if (field) {
        field.writeCache(fieldEdge)
      } else {
        field = this.updateFieldCache(fieldEdge)
        this.fields.set(field.id, field)
      }
    }

    // const newFieldsKeySet = new Set(this.fields.map((f) => f.key))
    //
    // for (const [key, field] of this.fields) {
    //   if (!newFieldsKeySet.has(key)) {
    //     this.fields.delete(field.id)
    //   }
    // }

    return this
  }

  public static hydrate = hydrate
}
