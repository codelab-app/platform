import type {
  IAtom,
  IAtomService,
  ICreateAtomDTO,
  IUpdateAtomDTO,
} from '@codelab/frontend/abstract/core'
import { IAtomDTO } from '@codelab/frontend/abstract/core'
import { getTagService } from '@codelab/frontend/domain/tag'
import { ModalService } from '@codelab/frontend/shared/utils'
import type { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import { connectNode, connectOwner, reconnectNodes } from '@codelab/shared/data'
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
    existingAtom: IAtom,
    { name, type, tags = [], allowedChildren = [] }: IUpdateAtomDTO,
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
          allowedChildren: [reconnectNodes(allowedChildrenIds)],
          tags: [reconnectNodes(tags)],
        },
        where: { id: existingAtom.id },
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
    const createApiNode = (atom: ICreateAtomDTO) => ({
      id: v4(),
      name: `${atom.name} API`,
      owner: connectOwner(atom.owner),
    })

    const connectTags = (atom: ICreateAtomDTO) => {
      return atom.tags?.map((tag) => ({
        where: { node: { id: tag } },
      }))
    }

    const connectOrCreateApi = (atom: ICreateAtomDTO) =>
      atom.api
        ? connectNode(atom.api)
        : {
            create: { node: createApiNode(atom) },
          }

    const input = data.map((atom) => ({
      id: atom.id ?? v4(),
      name: atom.name,
      type: atom.type,
      tags: { connect: connectTags(atom) },
      api: connectOrCreateApi(atom),
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
