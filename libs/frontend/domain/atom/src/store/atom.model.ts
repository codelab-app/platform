import type {
  IAtom,
  IAtomDTO,
  IAuth0Owner,
  IInterfaceType,
  ITag,
} from '@codelab/frontend/abstract/core'
import { tagRef } from '@codelab/frontend/domain/tag'
import { typeRef } from '@codelab/frontend/domain/type'
import { AtomCreateInput } from '@codelab/shared/abstract/codegen'
import type { IAtomType } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import {
  connectAuth0Owner,
  connectNodeIds,
} from '@codelab/shared/domain/mapper'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import { v4 } from 'uuid'
import { atomRef } from './atom.ref'
import { customTextInjectionWhiteList } from './custom-text-injection-whitelist'

@model('@codelab/Atom')
export class Atom
  extends Model({
    allowedChildren: prop<Array<Ref<IAtom>>>(() => []),
    api: prop<Ref<IInterfaceType>>(),
    icon: prop<string | null | undefined>(),
    id: idProp,
    name: prop<string>(),
    owner: prop<IAuth0Owner>(),
    tags: prop<Array<Ref<ITag>>>(() => []),
    type: prop<IAtomType>(),
  })
  implements IAtom
{
  /**
   * Determines whether the atom accepts children and text make sense for the type.
   */
  @computed
  get allowCustomTextInjection(): boolean {
    return customTextInjectionWhiteList.indexOf(this.type) > -1
  }

  // This must be defined outside the class or weird things happen https://github.com/xaviergonz/mobx-keystone/issues/173
  // static hydrate = hydrate
  static create({
    id,
    icon,
    name,
    type,
    owner,
    api,
    tags,
    allowedChildren,
  }: IAtomDTO) {
    return new Atom({
      allowedChildren: allowedChildren?.map((child) => atomRef(child.id)),
      api: typeRef<IInterfaceType>(api.id),
      icon,
      id,
      name,
      owner,
      tags: tags?.map((tag) => tagRef(tag.id)),
      type,
    })
  }

  @modelAction
  writeCache({
    id,
    name,
    type,
    icon,
    tags = [],
    api,
    allowedChildren = [],
  }: Partial<IAtomDTO>) {
    this.name = name ?? this.name
    this.type = type ?? this.type
    this.api = api?.id ? typeRef<IInterfaceType>(api.id) : this.api
    this.tags = tags.map((tag) => tagRef(tag.id))
    this.icon = icon ?? this.icon
    this.allowedChildren = allowedChildren.map((child) => atomRef(child.id))

    return this
  }

  @modelAction
  toCreateInput(): AtomCreateInput {
    // const connectOrCreateApi = (
    //   atom: Pick<ICreateAtomData, 'api' | 'name' | 'owner'>,
    // ) =>
    //   atom.api
    //     ? connectNodeId(atom.api)
    //     : {
    //         create: {
    //           node: InterfaceType.createApiNode({
    //             name: atom.name,
    //             owner: atom.owner,
    //           }),
    //         },
    //       }

    return {
      // api: connectOrCreateApi({ api, name, owner }),
      api: {
        create: {
          node: {
            id: v4(),
            kind: ITypeKind.InterfaceType,
            name: `${this.name}  API`,
            owner: connectAuth0Owner(this.owner),
          },
        },
      },

      id: this.id,

      name: this.name,

      tags: connectNodeIds(this.tags.map((tag) => tag.current.id)),

      type: this.type,
    }
  }
}
