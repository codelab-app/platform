import {
  assertIsTypeKind,
  IFieldDTO,
  IInterfaceType,
  IInterfaceTypeDTO,
  ITypeDTO,
  ITypeKind,
} from '@codelab/shared/abstract/core'
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
  extends ExtendedModel(() => ({
    baseModel: createTypeBase(ITypeKind.InterfaceType),
    props: {
      fields: prop(() => objectMap<Field>()),
    },
  }))
  implements IInterfaceType
{
  field(id: string): Field | undefined {
    return this.fields.get(id)
  }

  @modelAction
  updateFieldCache(fragment: IFieldDTO): Field {
    const field = Field.hydrate(fragment)

    this.fields.set(field.id, field)

    return field
  }

  @modelAction
  deleteFieldLocal(field: Field) {
    this.fields.delete(field.id)
  }

  @modelAction
  updateCache(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.InterfaceType) {
      return
    }

    for (const fieldEdge of fragment.fieldsConnection.edges) {
      let field = this.field(fieldEdge.id)

      if (field) {
        field.updateCache(fieldEdge, this.id)
      } else {
        field = this.updateFieldCache(fieldEdge)
        this.fields.set(field.id, field)
      }
    }

    // const newFieldsKeySet = new Set(this.fields.map((f) => f.key))
    //
    // for (const [key, field] of this._fields) {
    //   if (!newFieldsKeySet.has(key)) {
    //     this._fields.delete(field.id)
    //   }
    // }
  }

  public static hydrate = hydrate
}
