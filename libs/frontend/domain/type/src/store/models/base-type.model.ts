import type { IBaseType, ITypeDTO } from '@codelab/frontend/abstract/core'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import {
  _async,
  _await,
  ExtendedModel,
  idProp,
  Model,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import { getTypeApi } from '../apis/type.api'
import { updateBaseTypeCache } from '../base-type'

class BaseType
  extends Model({
    id: idProp,
    name: prop<string>(),
    ownerId: prop<string>().withSetter(),
  })
  implements Omit<IBaseType, 'kind' | 'writeCache'>
{
  @modelFlow
  @transaction
  getPagination = _async(function* (
    this: IBaseType,
    name_CONTAINS?: Maybe<string>,
  ) {
    const {
      baseTypeOffset: { offset },
    } = yield* _await(
      getTypeApi.GetBaseTypeOffset({
        where: {
          id: this.id,
          name_CONTAINS: name_CONTAINS ?? '',
        },
      }),
    )

    return {
      offset,
    }
  })

  // toString() {
  //   return `{ ${this.name}: ${this.kind} }`
  // }
}

export const createBaseType = <T extends ITypeKind>(typeKind: T) => {
  return class
    extends ExtendedModel(BaseType, {
      kind: prop<T>(() => typeKind),
    })
    implements IBaseType
  {
    writeCache(fragment: ITypeDTO) {
      updateBaseTypeCache(this, fragment)

      return this
    }
  }
}
