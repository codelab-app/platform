import type { IAtomService } from '@codelab/frontend/abstract/application'
import type {
  IAtomModel,
  ICreateAtomData,
  IUpdateAtomData,
} from '@codelab/frontend/abstract/domain'
import { atomRef } from '@codelab/frontend/abstract/domain'
import { PaginationService } from '@codelab/frontend-application-shared-store/pagination'
import {
  InlineFormService,
  ModalService,
} from '@codelab/frontend-application-shared-store/ui'
import { getTypeService } from '@codelab/frontend-application-type/services'
import { AtomDomainService } from '@codelab/frontend-domain-atom/services'
import {
  filterAtoms,
  mapAtomOptions,
} from '@codelab/frontend-domain-atom/store'
import type { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import {
  IElementRenderTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import isEmpty from 'lodash/isEmpty'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import { v4 } from 'uuid'
import { AtomRepository } from './atom.repo'
import { AtomFormService } from './atom-form.service'
import { AtomModalService, AtomsModalService } from './atom-modal.service'

@model('@codelab/AtomService')
export class AtomService
  extends Model({
    atomDomainService: prop(() => new AtomDomainService({})),
    atomRepository: prop(() => new AtomRepository({})),
    createForm: prop(() => new InlineFormService({})),
    createModal: prop(() => new ModalService({})),
    deleteManyModal: prop(() => new AtomsModalService({})),
    paginationService: prop(
      () => new PaginationService<IAtomModel, { name?: string }>({}),
    ),
    updateForm: prop(() => new AtomFormService({})),
    updateModal: prop(() => new AtomModalService({})),
  })
  implements IAtomService
{
  /**
   * @param interfaceId Optional interface ID for connecting to existing interface, instead of creating an interface
   */
  @modelFlow
  @transaction
  create = _async(function* (
    this: AtomService,
    {
      externalCssSource,
      externalJsSource,
      externalSourceType,
      id,
      name,
      tags = [],
      type,
    }: ICreateAtomData,
  ) {
    const api = this.typeService.typeDomainService.hydrateInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: `${name} API`,
    })

    const atom = this.atomDomainService.hydrate({
      __typename: IElementRenderTypeKind.Atom,
      api,
      externalCssSource,
      externalJsSource,
      externalSourceType,
      id,
      name,
      tags,
      type,
    })

    yield* _await(this.atomRepository.add(atom))

    this.paginationService.dataRefs.set(atom.id, atomRef(atom))

    return atom
  })

  @modelFlow
  @transaction
  delete = _async(function* (this: IAtomService, ids: Array<string>) {
    const atomsToDelete: Array<IAtomModel> = []

    ids.forEach((id) => {
      const atom = this.atomDomainService.atoms.get(id)

      if (atom) {
        atomsToDelete.push(atom)
        this.atomDomainService.atoms.delete(id)
      }
    })

    const result = yield* _await(this.atomRepository.delete(atomsToDelete))

    return result
  })

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

    this.paginationService.totalItems = count

    if (!isEmpty(where) || options?.limit) {
      this.typeService.typeDomainService.hydrateTypes({
        interfaceTypes: atoms.map((atom) => atom.api),
      })
    }

    return atoms.map((atom) => this.atomDomainService.hydrate(atom))
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: AtomService, id: string) {
    if (this.atomDomainService.atoms.has(id)) {
      return this.atomDomainService.atoms.get(id)
    }

    const all = yield* _await(this.getAll({ id }))

    return all[0]
  })

  @modelFlow
  getSelectAtomOptions = _async(function* (
    this: AtomService,
    fieldProps: { value?: string },
    parent?: IAtomModel,
  ) {
    const atoms = yield* _await(this.atomRepository.getSelectAtomOptions())
    const atomOptions = parent ? filterAtoms(atoms, parent) : atoms

    return atomOptions.map(mapAtomOptions)
  })

  @modelFlow
  loadApi = _async(function* (this: AtomService, id: string) {
    const atom = this.atomDomainService.atoms.get(id)

    if (atom?.api) {
      yield* _await(this.typeService.getInterface(atom.api.id))
    }
  })

  @modelFlow
  @transaction
  update = _async(function* (
    this: AtomService,
    {
      externalCssSource,
      externalJsSource,
      externalSourceType,
      id,
      name,
      requiredParents = [],
      suggestedChildren = [],
      tags = [],
      type,
    }: IUpdateAtomData,
  ) {
    const atom = this.atomDomainService.atoms.get(id)

    atom?.writeCache({
      externalCssSource,
      externalJsSource,
      externalSourceType,
      name,
      requiredParents: requiredParents.map((child) => ({ id: child.id })),
      suggestedChildren: suggestedChildren.map((child) => ({ id: child.id })),
      tags,
      type,
    })

    yield* _await(this.atomRepository.update(atom!))

    return atom!
  })

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

  @computed
  private get typeService() {
    return getTypeService(this)
  }
}
