import type {
  IAtom,
  IAtomDTO,
  IAtomService,
  ICreateAtomData,
  IInterfaceType,
  IUpdateAtomData,
} from '@codelab/frontend/abstract/core'
import { getTagService } from '@codelab/frontend/domain/tag'
import { getTypeService, typeRef } from '@codelab/frontend/domain/type'
import { ModalService, PaginationService } from '@codelab/frontend/shared/utils'
import type { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import {
  _async,
  _await,
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
import { atomRef } from './atom.ref'
import { AtomRepository } from './atom.repo'
import { AtomModalService, AtomsModalService } from './atom-modal.service'

@model('@codelab/AtomService')
export class AtomService
  extends Model({
    allAtomsLoaded: prop(() => false),
    atomRepository: prop(() => new AtomRepository({})),
    atoms: prop(() => objectMap<IAtom>()),
    createModal: prop(() => new ModalService({})),
    deleteManyModal: prop(() => new AtomsModalService({})),
    id: idProp,
    paginationService: prop(
      () => new PaginationService<IAtom, { name?: string }>({}),
    ),
    updateModal: prop(() => new AtomModalService({})),
  })
  implements IAtomService
{
  onAttachedToRootStore() {
    this.paginationService.getDataFn = async (page, pageSize, filter) => {
      const items = await this.getAll(
        { name_MATCHES: `(?i).*${filter.name ?? ''}.*` },
        {
          limit: pageSize,
          offset: (page - 1) * pageSize,
        },
      )

      return { items, totalItems: this.paginationService.totalItems }
    }
  }

  @modelFlow
  @transaction
  update = _async(function* (
    this: AtomService,
    {
      id,
      name,
      requiredParents = [],
      suggestedChildren = [],
      tags = [],
      type,
    }: IUpdateAtomData,
  ) {
    const atom = this.atoms.get(id)

    atom?.writeCache({
      name,
      requiredParents: requiredParents.map((child) => ({ id: child })),
      suggestedChildren: suggestedChildren.map((child) => ({ id: child })),
      tags,
      type,
    })

    yield* _await(this.atomRepository.update(atom!))

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
  add = ({
    api,
    id,
    name,
    owner,
    requiredParents,
    suggestedChildren,
    type,
  }: IAtomDTO) => {
    // const tagRefs = tags?.map((tag) => tagRef(tag.id))
    const apiRef = typeRef<IInterfaceType>(api.id)

    const atom = Atom.create({
      api: apiRef,
      id,
      name,
      owner,
      requiredParents,
      suggestedChildren,
      tags: [],
      type,
    })

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
    const {
      aggregate: { count },
      items: atoms,
    } = yield* _await(this.atomRepository.find(where, options))

    if (!where) {
      this.allAtomsLoaded = true
    }

    this.paginationService.totalItems = count

    return atoms.map((atom) => {
      this.typeService.loadTypes({ interfaceTypes: [atom.api] })

      return this.add(atom)
    })
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

  @modelFlow
  getOptions = _async(function* (this: AtomService) {
    const options = yield* _await(this.atomRepository.findOptions())

    return options
  })

  /**
   * @param interfaceId Optional interface ID for connecting to existing interface, instead of creating an interface
   */
  @modelFlow
  @transaction
  create = _async(function* (
    this: AtomService,
    { id, name, owner, tags = [], type }: ICreateAtomData,
  ) {
    const interfaceType = this.typeService.addInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: `${name} API`,
      owner,
    })

    const atom = Atom.create({
      api: interfaceType,
      id,
      name,
      owner,
      tags,
      type,
    })

    this.atoms.set(atom.id, atom)

    yield* _await(this.atomRepository.add(atom))

    this.paginationService.dataRefs.set(atom.id, atomRef(atom))

    return atom
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: IAtomService, ids: Array<string>) {
    const atomsToDelete: Array<IAtom> = []

    ids.forEach((id) => {
      const atom = this.atoms.get(id)

      if (atom) {
        atomsToDelete.push(atom)
        this.atoms.delete(id)
      }
    })

    const result = yield* _await(this.atomRepository.delete(atomsToDelete))

    return result
  })
}
