import { TypeKind } from '@codelab/shared/abstract/core'
import { idProp, Model, prop } from 'mobx-keystone'
import {
  typeCreateInputFactory,
  typeUpdateInputFactory,
} from '../../shared/type-input.factory'
import type { UpdateTypeSchema } from '../../use-cases/types'
import type { AnyType } from './types'

export const createTypeBase = <T extends TypeKind>(typeKind: T) => {
  return class extends Model({
    id: idProp,
    name: prop<string>(),
    typeKind: prop<T>(() => typeKind),
    ownerAuth0Id: prop<string>().withSetter(),
  }) {
    makeCreateInput(currentUserAuth0Id: string) {
      return typeCreateInputFactory(this as any as AnyType, currentUserAuth0Id)
    }

    makeUpdateInput() {
      return typeUpdateInputFactory(this as any as AnyType)
    }

    applyUpdateData({ name }: UpdateTypeSchema) {
      this.name = name
    }
  }
}
