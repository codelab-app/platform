import { getTagService } from '@codelab/frontend/modules/tag'
import { ModalService, throwIfUndefined } from '@codelab/frontend/shared/utils'
import { AtomWhere } from '@codelab/shared/abstract/codegen'
import type {
  IAtom,
  IAtomDTO,
  IAtomService,
  ICreateAtomDTO,
  IUpdateAtomDTO,
} from '@codelab/shared/abstract/core'
import {
  connectNode,
  connectNodes,
  connectTypeOwner,
  disconnectNodes,
} from '@codelab/shared/data'
import { difference } from 'lodash'
import { computed } from 'mobx'
import {
  _async,
  _await,
  arraySet,
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
    atoms: prop(() => objectMap<IAtom>()),
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
    atom: Atom,
    { name, type, tags }: IUpdateAtomDTO,
  ) {
    const existingTagIds = atom.tags.map((tag) => tag.id)
    const tagsToConnect = difference(tags, existingTagIds)
    const tagsToDisconnect = difference(existingTagIds, tags || [])

    const { updateAtoms } = yield* _await(
      atomApi.UpdateAtoms({
        update: {
          name,
          type,
          tags: [
            {
              ...connectNodes(tagsToConnect),
              ...disconnectNodes(tagsToDisconnect),
            },
          ],
        },
        where: { id: atom.id },
      }),
    )

    const updatedAtom = updateAtoms?.atoms[0]

    if (!atom) {
      throw new Error('Failed to update atom')
    }

    atom.writeCache(updatedAtom)

    return atom
  })

  @computed
  get atomsList() {
    return Array.from(this.atoms.values())
  }

  @modelAction
  writeCache(atom: IAtomDTO) {
    console.debug('AtomService.writeCache', atom)

    const tagService = getTagService(this)

    atom.tags.map((tag) => tagService.writeCache(tag))

    let atomModel = this.atoms.get(atom.id)

    if (atomModel) {
      atomModel.writeCache(atom)
    } else {
      atomModel = Atom.hydrate(atom)
      this.atoms.set(atom.id, atomModel)
    }

    return atomModel
  }

  @modelFlow
  @transaction
  getAll = _async(function* (this: AtomService, where?: AtomWhere) {
    const { atoms } = yield* _await(atomApi.GetAtoms({ where }))

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
      owner: connectTypeOwner(atom.owner),
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
      id: atom?.id ?? v4(),
      name: atom.name,
      type: atom.type,
      tags: { connect: connectTags(atom) },
      api: connectOrCreateApi(atom),
    }))

    const {
      createAtoms: { atoms },
    } = yield* _await(atomApi.CreateAtoms({ input }))

    if (!atoms.length) {
      // Throw an error so that the transaction middleware rolls back the changes
      throw new Error('Atom was not created')
    }

    return atoms.map((atom) => {
      const atomModel = Atom.hydrate(atom)

      this.atoms.set(atomModel.id, atomModel)

      return atomModel
    })
  })

  @modelFlow
  @transaction
  deleteMany = _async(function* (this: IAtomService, ids: Array<string>) {
    for (const id of ids) {
      if (this.atoms.has(id)) {
        this.atoms.delete(id)
      }
    }

    const { deleteAtoms } = yield* _await(
      atomApi.DeleteAtoms({ where: { id_IN: ids } }),
    )

    if (deleteAtoms.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('Atom was not deleted')
    }

    return deleteAtoms
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: IAtomService, id: string) {
    const existing = throwIfUndefined(this.atoms.get(id))

    if (existing) {
      this.atoms.delete(id)
    }

    const { deleteAtoms } = yield* _await(
      atomApi.DeleteAtoms({ where: { id } }),
    )

    if (deleteAtoms.nodesDeleted === 0) {
      // throw error so that the atomic middleware rolls back the changes
      throw new Error('Atom was not deleted')
    }

    return existing
  })
}
