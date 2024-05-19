import type {
  GetDataFn,
  IAtomService,
} from '@codelab/frontend/abstract/application'
import {
  atomRef,
  type IAtomModel,
  type ICreateAtomData,
  type IUpdateAtomData,
} from '@codelab/frontend/abstract/domain'
import { graphqlFilterMatches } from '@codelab/frontend-application-shared-store/pagination'
import { useTypeService } from '@codelab/frontend-application-type/services'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import {
  filterAtoms,
  mapAtomOptions,
} from '@codelab/frontend-domain-atom/store'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import {
  IElementRenderTypeKind,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import type { AtomOptions, AtomWhere } from '@codelab/shared/infra/gql'
import { Validator } from '@codelab/shared/infra/schema'
import isEmpty from 'lodash/isEmpty'
import { v4 } from 'uuid'

export const useAtomService = (): IAtomService => {
  const {
    pagination: { atomPagination },
  } = useApplicationStore()

  const { atomDomainService, typeDomainService } = useDomainStore()
  const typeService = useTypeService()

  const getDataFn: GetDataFn<IAtomModel> = async (
    page,
    pageSize,
    filter,
    search,
  ) => {
    const { aggregate, items } = await atomRepository.find(
      graphqlFilterMatches(filter, search),
      {
        limit: pageSize,
        offset: (page - 1) * pageSize,
      },
    )

    const atoms = items.map((atom) => {
      typeDomainService.hydrateInterface(atom.api)

      return atomDomainService.hydrate(atom)
    })

    return { items: atoms, totalItems: aggregate.count }
  }

  const create = async ({
    externalCssSource,
    externalJsSource,
    externalSourceType,
    id,
    name,
    tags = [],
    type,
  }: ICreateAtomData) => {
    const api = typeDomainService.hydrateInterface({
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: `${name} API`,
    })

    const atom = atomDomainService.hydrate({
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

    await atomRepository.add(atom)

    atomPagination.dataRefs.set(atom.id, atomRef(atom))

    return atom
  }

  const remove = async (items: Array<IAtomModel>) => {
    const atomsToDelete: Array<IAtomModel> = []

    items.forEach(({ id }) => {
      const atom = atomDomainService.atoms.get(id)

      if (atom) {
        atomsToDelete.push(atom)
        atomDomainService.atoms.delete(id)
      }
    })

    return await atomRepository.delete(atomsToDelete)
  }

  const getAll = async (where?: AtomWhere, options?: AtomOptions) => {
    const {
      aggregate: { count },
      items: atoms,
    } = await atomRepository.find(where, options)

    atomPagination.totalItems = count

    if (!isEmpty(where) || options?.limit) {
      typeDomainService.hydrateTypes({
        interfaceTypes: atoms.map((atom) => atom.api),
      })
    }

    return atoms.map((atom) => atomDomainService.hydrate(atom))
  }

  const getOne = async (id: string) => {
    if (atomDomainService.atoms.has(id)) {
      return atomDomainService.atoms.get(id)
    }

    const all = await getAll({ id })

    return all[0]
  }

  const getSelectAtomOptions = async (parent?: IAtomModel) => {
    const atoms = await atomRepository.getSelectAtomOptions()
    const atomOptions = parent ? filterAtoms(atoms, parent) : atoms

    return atomOptions.map(mapAtomOptions)
  }

  const loadApi = async (id: string) => {
    const atom = atomDomainService.atoms.get(id)

    if (atom?.api) {
      await typeService.getInterface(atom.api.id)
    }
  }

  const update = async ({
    externalCssSource,
    externalJsSource,
    externalSourceType,
    id,
    name,
    requiredParents = [],
    suggestedChildren = [],
    tags = [],
    type,
  }: IUpdateAtomData) => {
    const atom = atomDomainService.atoms.get(id)

    Validator.assertsDefined(atom)

    atom.writeCache({
      externalCssSource,
      externalJsSource,
      externalSourceType,
      name,
      requiredParents: requiredParents.map((child) => ({ id: child.id })),
      suggestedChildren: suggestedChildren.map((child) => ({ id: child.id })),
      tags,
      type,
    })

    await atomRepository.update(atom)

    return atom
  }

  return {
    create,
    getAll,
    getDataFn,
    getOne,
    getSelectAtomOptions,
    loadApi,
    paginationService: atomPagination,
    remove,
    update,
  }
}
