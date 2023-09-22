import type {
  IAtomModel,
  IAtomService,
  IComponentType,
  ICreateAtomData,
  IInterfaceType,
  IUpdateAtomData,
} from '@codelab/frontend/abstract/core'
import { atomRef, typeRef } from '@codelab/frontend/abstract/core'
import {
  InlineFormService,
  ModalService,
  PaginationService,
} from '@codelab/frontend/domain/shared'
import { getTagService } from '@codelab/frontend/domain/tag'
import { getTypeService } from '@codelab/frontend/domain/type'
import { dynamicLoader } from '@codelab/frontend/shared/utils'
import type { AtomOptions, AtomWhere } from '@codelab/shared/abstract/codegen'
import { IAtomDTO, IAtomType, ITypeKind } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import compact from 'lodash/compact'
import isEmpty from 'lodash/isEmpty'
import uniqBy from 'lodash/uniqBy'
import { computed, observable } from 'mobx'
import type { Ref } from 'mobx-keystone'
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
import { filterAtoms, mapAtomOptions } from './atom.filter'
import { Atom } from './atom.model'
import { AtomRepository } from './atom.repo'
import { AtomFormService } from './atom-form.service'
import { AtomModalService, AtomsModalService } from './atom-modal.service'

@model('@codelab/AtomService')
export class AtomService
  extends Model({
    atomRepository: prop(() => new AtomRepository({})),
    atoms: prop(() => objectMap<IAtomModel>()),
    createForm: prop(() => new InlineFormService({})),
    createModal: prop(() => new ModalService({})),
    defaultRenderType: prop<Nullable<Ref<IAtomModel>>>(null).withSetter(),
    deleteManyModal: prop(() => new AtomsModalService({})),
    id: idProp,
    loadedExternalCssSources: prop(() => arraySet<string>()),
    loadedExternalJsSources: prop(() => arraySet<string>()),
    paginationService: prop(
      () => new PaginationService<IAtomModel, { name?: string }>({}),
    ),
    updateForm: prop(() => new AtomFormService({})),
    updateModal: prop(() => new AtomModalService({})),
  })
  implements IAtomService
{
  @computed
  get atomsList() {
    return Array.from(this.atoms.values())
  }

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
    const api = this.typeService.addInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: `${name} API`,
    })

    const atom = this.add({
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
      const atom = this.atoms.get(id)

      if (atom) {
        atomsToDelete.push(atom)
        this.atoms.delete(id)
      }
    })

    const result = yield* _await(this.atomRepository.delete(atomsToDelete))

    return result
  })

  @observable
  dynamicComponents: Record<string, IComponentType> = {}

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

  /**
   * `Element.renderType` is required now, so anytime we create an Element, we need to pass the default value, which is an `Atom.type === ReactFragment`
   */
  @modelFlow
  getDefaultElementRenderType = _async(function* (this: IAtomService) {
    if (this.defaultRenderType) {
      return this.defaultRenderType.current
    }

    /**
     * Only fetch if not exists
     */
    const atomReactFragment = (yield* _await(
      this.atomRepository.find({
        type: IAtomType.ReactFragment,
      }),
    )).items[0]

    if (!atomReactFragment) {
      throw new Error('Atom of type `ReactFragment` must be seeded first')
    }

    const atom = this.add(atomReactFragment)

    this.setDefaultRenderType(atomRef(atom))

    return atom
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

  @modelFlow
  getSelectAtomOptions = _async(function* (
    this: AtomService,
    fieldProps: { value?: string },
    parent?: IAtomModel,
  ) {
    const result = yield* _await(this.atomRepository.findOptions())

    const currentAtom = fieldProps.value
      ? this.atoms.get(fieldProps.value)
      : undefined

    const atoms = uniqBy(compact([currentAtom, ...result]), 'id')

    for (const atom of atoms) {
      this.add(atom)
    }

    return parent ? filterAtoms(atoms, parent) : atoms.map(mapAtomOptions)
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
    const atom = this.atoms.get(id)

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

  @modelAction
  add(atomDto: IAtomDTO) {
    console.debug('AtomService.add()', atomDto)

    let atom = this.atoms.get(atomDto.id)

    if (atom) {
      atom.writeCache(atomDto)
    } else {
      const apiRef = typeRef<IInterfaceType>(atomDto.api.id)

      atom = Atom.create({
        ...atomDto,
        api: apiRef,
      })
    }

    const { externalCssSource, externalJsSource, externalSourceType } = atomDto

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
  private get tagService() {
    return getTagService(this)
  }

  @computed
  private get typeService() {
    return getTypeService(this)
  }
}
