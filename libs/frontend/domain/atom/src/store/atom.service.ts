import type {
  IAtom,
  IAtomService,
  ICreateAtomDTO,
  IUpdateAtomDTO,
} from '@codelab/frontend/abstract/core'
import { IAtomDTO } from '@codelab/frontend/abstract/core'
import { getTagService } from '@codelab/frontend/domain/tag'
import { InterfaceType } from '@codelab/frontend/domain/type'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import {
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
  })
  implements IAtomService
{
  @modelFlow
  @transaction
  update = _async(function* (
    this: AtomService,
    { id, name, type, tags = [], allowedChildren = [] }: IUpdateAtomDTO,
  ) {
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
          tags: reconnectNodeIds(tags),
        },
        where: { id },
      }),
    )

    return atoms.map((atom) => this.writeCache(atom))
  })

  @computed
  get atomsList() {
    return Array.from(this.atoms.values())
  }

  @modelAction
  writeCache(atom: IAtomDTO) {
    console.debug('AtomService.writeCache', atom)

    let atomModel = this.atoms.get(atom.id)

    if (atomModel) {
      atomModel = atomModel.writeCache(atom)
    } else {
      atomModel = Atom.hydrate(atom)
      this.atoms.set(atom.id, atomModel)
    }

    const tagService = getTagService(this)

    atom.tags.map((tag) => tagService.writeCache(tag))

    return atomModel
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

    return atoms.map((atom) => this.writeCache(atom))
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
  create = _async(function* (this: AtomService, data: Array<ICreateAtomDTO>) {
    const connectOrCreateApi = (
      atom: Pick<ICreateAtomDTO, 'api' | 'name' | 'owner'>,
    ) =>
      atom.api
        ? connectNodeId(atom.api)
        : {
            create: {
              node: InterfaceType.createApiNode({
                name: atom.name,
                owner: atom.owner,
              }),
            },
          }

    const input = data.map(({ id, name, type, tags, api, owner }) => ({
      id,
      name,
      type,
      tags: connectNodeIds(tags),
      api: connectOrCreateApi({ api, name, owner }),
    }))

    const {
      createAtoms: { atoms },
    } = yield* _await(atomApi.CreateAtoms({ input }))

    return atoms.map((atom) => this.writeCache(atom))
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
