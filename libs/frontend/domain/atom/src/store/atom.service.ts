import type {
  IAtom,
  IAtomService,
  ICreateAtomData,
  IInterfaceType,
  IUpdateAtomData,
} from '@codelab/frontend/abstract/core'
import { IAtomDTO } from '@codelab/frontend/abstract/core'
import { getTagService, tagRef } from '@codelab/frontend/domain/tag'
import {
  getTypeService,
  InterfaceType,
  typeRef,
} from '@codelab/frontend/domain/type'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import {
  connectAuth0Owner,
  connectNodeId,
  connectNodeIds,
  reconnectNodeIds,
} from '@codelab/shared/domain/mapper'
import { computed } from 'mobx'
import {
  _async,
  _await,
  arraySet,
  idProp,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { v4 } from 'uuid'
import { atomApi } from './atom.api'
import { Atom } from './atom.model'
import { AtomRepository } from './atom.repository'
import { AtomModalService, AtomsModalService } from './atom-modal.service'

@model('@codelab/AtomService')
export class AtomService
  extends Model({
    id: idProp,
    allAtomsLoaded: prop(() => false),
    atoms: prop(() => objectMap<IAtom>()),
    count: prop(() => 1),
    createModal: prop(() => new ModalService({})),
    updateModal: prop(() => new AtomModalService({})),
    deleteManyModal: prop(() => new AtomsModalService({})),
    selectedIds: prop(() => arraySet<string>()).withSetter(),
    atomRepository: prop(() => new AtomRepository({})),
  })
  implements IAtomService
{
  @modelFlow
  @transaction
  update = _async(function* (
    this: AtomService,
    { id, name, type, tags = [], allowedChildren = [] }: IUpdateAtomData,
  ) {
    const atom = this.atoms.get(id)

    atom?.writeCache({
      name,
      type,
      tags,
      allowedChildren: allowedChildren.map((child) => ({ id: child })),
    })

    const allowedChildrenIds = allowedChildren.map(
      (allowedChild) => allowedChild,
    )

    const {
      updateAtoms: { atoms },
    } = yield* _await(
      atomApi.UpdateAtoms({
        update: {
          name,
          type,
          allowedChildren: reconnectNodeIds(allowedChildrenIds),
          tags: reconnectNodeIds(tags.map((tag) => tag.id)),
        },
        where: { id },
      }),
    )

    return atom!
  })

  @computed
  get tagService() {
    return getTagService(this)
  }

  @computed
  get typeService() {
    return getTypeService(this)
  }

  @computed
  get atomsList() {
    return Array.from(this.atoms.values())
  }

  @modelAction
  add({ tags, api, allowedChildren, ...atomDTO }: IAtomDTO) {
    const tagRefs = tags?.map((tag) => tagRef(tag.id))
    const apiRef = typeRef<IInterfaceType>(api.id)
    const atom = new Atom({ ...atomDTO, api: apiRef, tags: tagRefs })

    this.atoms.set(atom.id, atom)

    return atom
  }

  @modelFlow
  @transaction
  getAll = _async(function* (
    this: AtomService,
    where?: AtomWhere,
    options?: AtomOptions,
  ) {
    const { atoms, atomsAggregate } = yield* _await(
      atomApi.GetAtoms({ where, options }),
    )

    if (!where) {
      this.allAtomsLoaded = true
    }

    this.count = atomsAggregate.count

    return atoms.map((atom) => this.add(atom))
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: AtomService, id: string) {
    if (this.atoms.has(id)) {
      return this.atoms.get(id)
    }

    const all = yield* _await(this.getAll({ id }))

    return all[0]
  })

  /**
   * @param interfaceId Optional interface ID for connecting to existing interface, instead of creating an interface
   */
  @modelFlow
  @transaction
  create = _async(function* (
    this: AtomService,
    { id, name, type, tags = [], owner }: ICreateAtomData,
  ) {
    const interfaceType = this.typeService.addInterface({
      id: v4(),
      name: `${name} API`,
      kind: ITypeKind.InterfaceType,
      owner,
    })

    const atom = Atom.create({
      id,
      name,
      type,
      owner,
      tags,
      api: interfaceType,
    })

    this.atoms.set(atom.id, atom)

    yield* _await(this.atomRepository.add(atom))

    return atom
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: IAtomService, ids: Array<string>) {
    ids.forEach((id) => this.atoms.delete(id))

    const {
      deleteAtoms: { nodesDeleted },
    } = yield* _await(atomApi.DeleteAtoms({ where: { id_IN: ids } }))

    return nodesDeleted
  })
}
