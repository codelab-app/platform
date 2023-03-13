import type {
  IEnumType,
  IEnumTypeDTO,
  IEnumTypeValueDTO,
} from '@codelab/frontend/abstract/core'
import { ITypeDTO } from '@codelab/frontend/abstract/core'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared/abstract/core'
import merge from 'lodash/merge'
import {
  ExtendedModel,
  idProp,
  Model,
  model,
  modelAction,
  prop,
} from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'
import { createBaseType } from './base-type.model'

const hydrateEnumValue = (fragment: IEnumTypeValueDTO) =>
  new EnumTypeValue({
    ...fragment,
    key: fragment.key,
  })

@model('@codelab/EnumTypeValue')
export class EnumTypeValue extends Model({
  id: idProp,
  key: prop<string>(),
  value: prop<string>(),
}) {
  get label() {
    return this.key
  }

  public static hydrate = hydrateEnumValue
}

const create = ({ allowedValues, id, kind, name, owner }: IEnumTypeDTO) => {
  assertIsTypeKind(kind, ITypeKind.EnumType)

  return new EnumType({
    allowedValues: allowedValues.map(EnumTypeValue.hydrate),
    id,
    kind,
    name,
    owner,
  })
}

@model('@codelab/EnumType')
export class EnumType
  extends ExtendedModel(createBaseType(ITypeKind.EnumType), {
    allowedValues: prop<Array<EnumTypeValue>>(() => []),
  })
  implements IEnumType
{
  @modelAction
  add(fragment: ITypeDTO) {
    updateBaseTypeCache(this, fragment)

    if (fragment.__typename !== ITypeKind.EnumType) {
      throw new Error('Incorrect EnumType')
    }

    this.allowedValues = fragment.allowedValues.map(EnumTypeValue.hydrate)

    return this
  }

  toCreateInput() {
    return {
      ...super.toCreateInput(),
      allowedValues: {
        create: this.allowedValues.map((value) => ({
          node: { id: value.id, key: value.key, value: value.value },
        })),
      },
    }
  }

  toUpdateInput() {
    return merge(super.toUpdateInput(), {
      // For some reason if the disconnect and delete are in the update section it throws an error
      delete: {
        allowedValues: [
          {
            where: {
              node: {
                NOT: {
                  id_IN: this.allowedValues.map((av) => av.id),
                },
              },
            },
          },
        ],
      },
      update: {
        allowedValues: [
          {
            create: this.allowedValues.map((value) => ({
              node: { id: value.id, key: value.key, value: value.value },
            })),
          },
        ],
      },
    })
  }

  public static create = create
}
