import type {
  ICreateAtomData,
  IMapper,
  IUpdateAtomData,
} from '@codelab/frontend/abstract/domain'
import type {
  AtomCreateInput,
  AtomFragment,
  AtomUpdateInput,
} from '@codelab/shared/infra/gql'

import {
  type IAtomDto,
  IElementRenderTypeKind,
  ITypeKind,
  type IUserDto,
} from '@codelab/shared/abstract/core'
import {
  connectNodeId,
  connectNodeIds,
  connectOwner,
  reconnectNodeIds,
} from '@codelab/shared/domain-old'
import { v4 } from 'uuid'

export class AtomMapper
  implements IMapper<IAtomDto, AtomCreateInput, AtomUpdateInput>
{
  constructor(public owner: IUserDto) {}

  // toDtoFromData(data: ICreateAtomData) {
  //   return {
  //     __typename: IElementRenderTypeKind.Atom,
  //     api: {
  //       id: v4(),
  //       kind: ITypeKind.InterfaceType,
  //       name: `${data.name} API`,
  //     },
  //     externalCssSource: data.externalCssSource,
  //     externalJsSource: data.externalJsSource,
  //     externalSourceType: data.externalSourceType,
  //     id: data.id,
  //     name: data.name,
  //     tags: data.tags,
  //     type: data.type,
  //   }
  // }

  toCreateInput(data: ICreateAtomData) {
    return {
      api: {
        create: {
          node: {
            id: v4(),
            kind: ITypeKind.InterfaceType,
            name: `${data.name} API`,
            owner: connectOwner(this.owner),
          },
        },
      },
      externalCssSource: data.externalCssSource,
      externalJsSource: data.externalJsSource,
      externalSourceType: data.externalSourceType,
      id: data.id,
      name: data.name,
      owner: connectOwner(this.owner),
      tags: connectNodeIds(data.tags?.map((tag) => tag.id)),
      type: data.type,
    }
  }

  toUpdateInput(data: IUpdateAtomData) {
    return {
      api: data.api.id ? connectNodeId(data.api.id) : undefined,
      externalCssSource: data.externalCssSource,
      externalJsSource: data.externalJsSource,
      externalSourceType: data.externalSourceType,
      id: data.id,
      name: data.name,
      requiredParents: reconnectNodeIds(
        data.requiredParents?.map((parent) => parent.id),
      ),
      suggestedChildren: reconnectNodeIds(
        data.suggestedChildren?.map((child) => child.id),
      ),
      tags: reconnectNodeIds(data.tags?.map((tag) => tag.id)),
      type: data.type,
    }
  }
}
