import { IBaseType, TypeKind } from '@codelab/shared/abstract/core'
import { idProp, prop } from 'mobx-keystone'
import { TypeFragment } from '../graphql'

// Using ExtendedModel with a BaseType produced a weird error that I couldn't figure out.
// This is a workaround - just call this when defining a type model as the props object
export const baseTypeProps = <TKind extends TypeKind>(kind: TKind) =>
  ({
    id: idProp,
    name: prop<string>(),
    typeKind: prop<TKind>(() => kind),
  } as const)

export const baseUpdateFromFragment = function (
  self: IBaseType,
  type: TypeFragment,
) {
  self.name = type.name
}
