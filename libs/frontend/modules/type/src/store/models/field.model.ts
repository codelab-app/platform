import {
  IAnyType,
  IField,
  IFieldDTO,
  IStateNode,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import { typeRef } from './union-type.model'

const hydrate = (data: IFieldDTO) => {
  const { id, key, name, description, fieldType } = data

  return new Field({
    id,
    type: typeRef(fieldType.id),
    name,
    description,
    key,
  })
}

@model('@codelab/Field')
export class Field
  extends Model(() => ({
    // this is a 'local' id, we don't use it in the backend. It's generated from the interfaceId + the key
    id: idProp,
    name: prop<Nullish<string>>(),
    description: prop<Nullish<string>>(),
    key: prop<string>(),
    type: prop<Ref<IAnyType>>(),
  }))
  implements IField
{
  @modelAction
  updateCache(fragment: IFieldDTO) {
    this.id = fragment.id
    this.name = fragment.name
    this.description = fragment.description
    this.key = fragment.key
    this.type = typeRef(fragment.fieldType.id)
  }

  antdNode(interfaceId: string): IStateNode {
    return {
      key: this.id,
      title: this.name,
      type: {
        id: this.type.id,
        kind: this.type.current.kind,
      },
      interfaceId,
      children:
        this.type.current.kind === ITypeKind.InterfaceType
          ? this.type.current.fieldList.flatMap((f) =>
              // pass the current interface instead of parent
              {
                console.log(this.type.current)

                return f.antdNode(this.type.id)
              },
            )
          : [],
    }
  }

  @modelAction
  static hydrate = hydrate
}

export const fieldRef = rootRef<Field>('@codelab/FieldRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
