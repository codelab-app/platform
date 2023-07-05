import type {
  IAtom,
  IAtomService,
  IComponentType,
  ICreateAtomData,
  IInterfaceType,
  IUpdateAtomData,
} from '@codelab/frontend/abstract/core'
import { atomRef, typeRef } from '@codelab/frontend/abstract/core'
import { getTagService } from '@codelab/frontend/domain/tag'
import { getTypeService } from '@codelab/frontend/domain/type'
import {
  dynamicLoader,
  ModalService,
  PaginationService,
} from '@codelab/frontend/shared/utils'
import type { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import type { IAtomDTO } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import isEmpty from 'lodash/isEmpty'
import { computed, observable } from 'mobx'
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
import { Atom } from './atom.model'
import { AtomRepository } from './atom.repo'
import { AtomModalService, AtomsModalService } from './atom-modal.service'

@model('@codelab/AtomService')
export class AtomService
  extends Model({
    atomRepository: prop(() => new AtomRepository({})),
    atoms: prop(() => objectMap<IAtom>()),
    createModal: prop(() => new ModalService({})),
    deleteManyModal: prop(() => new AtomsModalService({})),
    id: idProp,
    loadedExternalCssSources: prop(() => arraySet<string>()),
    loadedExternalJsSources: prop(() => arraySet<string>()),
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
    const atom = this.atoms.get(id)

    atom?.writeCache({
      externalCssSource,
      externalJsSource,
      externalSourceType,
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

  @observable
  dynamicComponents: Record<string, IComponentType> = {}

  @modelAction
  add = ({
    api,
    externalCssSource,
    externalJsSource,
    externalSourceType,
    icon,
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
      externalCssSource,
      externalJsSource,
      externalSourceType,
      icon,
      id,
      name,
      owner,
      requiredParents,
      suggestedChildren,
      tags: [],
      type,
    })

    // dynamically load an external css
    if (
      externalSourceType &&
      externalCssSource &&
      !this.loadedExternalCssSources.has(externalSourceType)
    ) {
      const link = document.createElement('link')
      link.setAttribute('rel', 'stylesheet')
      link.setAttribute('href', externalCssSource)
      document.head.appendChild(link)

      console.log(`Loaded external css for "${externalSourceType}"`)

      this.loadedExternalCssSources.add(externalSourceType)
    }

    // dynamically load an external js
    if (
      externalSourceType &&
      externalJsSource &&
      !this.loadedExternalJsSources.has(externalSourceType)
    ) {
      // this stores the react component into this class so it can be observable
      // @ts-expect-error: dynamic function
      window[`onload${externalSourceType}`] = (
        component: React.ComponentType,
      ) => {
        this.loadedExternalJsSources.add(externalSourceType)
        this.dynamicComponents[externalSourceType] = dynamicLoader(
          async () => component,
        )
      }

      const script = document.createElement('script')
      script.type = 'module'
      script.innerText = `
        import ${externalSourceType} from '${externalJsSource}';
        window.${externalSourceType} = ${externalSourceType};
        if (window.onload${externalSourceType}) {
          window.onload${externalSourceType}(${externalSourceType});
          delete window.onload${externalSourceType};
        }
      `
      document.getElementsByTagName('head')[0]?.appendChild(script)

      console.log(`Loaded external js for "${externalSourceType}"`)
    }

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

    this.paginationService.totalItems = count

    if (!isEmpty(where) || options?.limit) {
      this.typeService.loadTypes({
        interfaceTypes: atoms.map((atom) => atom.api),
      })
    }

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
    {
      externalCssSource,
      externalJsSource,
      externalSourceType,
      id,
      name,
      owner,
      tags = [],
      type,
    }: ICreateAtomData,
  ) {
    const api = this.typeService.addInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: `${name} API`,
      owner,
    })

    const atom = this.add({
      api,
      externalCssSource,
      externalJsSource,
      externalSourceType,
      id,
      name,
      owner,
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
