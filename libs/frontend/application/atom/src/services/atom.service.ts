'use client'

import type {
  GetDataFn,
  IAtomService,
} from '@codelab/frontend/abstract/application'
import type { AtomOptions, AtomWhere } from '@codelab/shared/infra/gql'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import {
  type IAtomModel,
  type ICreateAtomData,
  type IUpdateAtomData,
} from '@codelab/frontend/abstract/domain'
import { PageType } from '@codelab/frontend/abstract/types'
import { useUpdateSearchParams } from '@codelab/frontend/shared/utils'
import { graphqlFilterMatches } from '@codelab/frontend-application-shared-store/pagination'
import { useTypeService } from '@codelab/frontend-application-type/services'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import {
  filterAtoms,
  mapEntitySelectOptions,
} from '@codelab/frontend-domain-atom/store'
import { typeRepository } from '@codelab/frontend-domain-type/repositories'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { type IRef, ITypeKind } from '@codelab/shared/abstract/core'
import { Validator } from '@codelab/shared/infra/schema'
import { unsetSearchParam } from '@codelab/shared/utils'
import queryString from 'query-string'
import { isEmpty } from 'remeda'
import { v4 } from 'uuid'

export const useAtomService = (): IAtomService => {
  const {
    pagination: { atomPagination },
  } = useApplicationStore()

  const {
    atomDomainService,
    fieldDomainService,
    typeDomainService,
    userDomainService,
  } = useDomainStore()

  const user = userDomainService.user
  const owner = { id: user.id }
  const typeService = useTypeService()
  const { updateParams } = useUpdateSearchParams()

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
      atom.api.fields.forEach((field) => fieldDomainService.hydrate(field))
      typeDomainService.hydrateInterface(atom.api)

      return atomDomainService.hydrate(atom)
    })

    return { items: atoms, totalItems: aggregate.count }
  }

  const create = async (data: ICreateAtomData) => {
    const api = await typeRepository.add({
      __typename: ITypeKind.InterfaceType,
      fields: [],
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: `${data.name} API`,
      owner,
    })

    const atom = await atomRepository.add({
      ...data,
      __typename: 'Atom',
      api,
      owner,
    })

    Validator.assertsDefined(atom)

    return atom
  }

  const removeMany = async (items: Array<IAtomModel>) => {
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

    atomPagination.setTotalItems(count)

    if (!isEmpty(where ?? {}) || options?.limit) {
      typeDomainService.hydrateTypes({
        interfaceTypes: atoms.map((atom) => atom.api),
      })
    }

    return atoms.map((atom) => atomDomainService.hydrate(atom))
  }

  const getOne = async (id: string) => {
    const all = await getAll({ id })

    return all[0]
  }

  const getSelectAtomOptions = async (parent?: IAtomModel) => {
    const atoms = await atomRepository.getSelectAtomOptions()
    const atomOptions = parent ? filterAtoms(atoms, parent) : atoms

    return atomOptions.map(mapEntitySelectOptions)
  }

  const loadApi = async (id: string) => {
    const atom = atomDomainService.atoms.get(id) ?? (await getOne(id))

    if (atom?.api) {
      await typeService.getInterface(atom.api.id)
    }
  }

  const update = async ({ id, ...data }: IUpdateAtomData) => {
    const atom = atomDomainService.atoms.get(id)

    atom?.writeCache(data)

    await atomRepository.update(
      {
        id,
      },
      data,
    )

    Validator.assertsDefined(atom)

    return atom
  }

  const getOneFromCache = (ref: IRef) => {
    return atomDomainService.atoms.get(ref.id)
  }

  const getAllFromCache = () => {
    return atomDomainService.atomsList
  }

  const goToAtomsPage = (router: AppRouterInstance) => {
    router.push(PageType.Atoms())
  }

  const goToDeleteAtomPage = (ref: IRef, router: AppRouterInstance) => {
    router.push(PageType.AtomDelete(ref))
  }

  const atomPopoverUpdate = {
    close: (router: AppRouterInstance) => {
      const searchParams = new URLSearchParams(window.location.search)

      searchParams.delete('node')

      const url = queryString.stringifyUrl({
        query: Object.fromEntries(searchParams.entries()),
        url: PageType.Atoms(),
      })

      router.push(url)
    },
    open: (router: AppRouterInstance) => {
      router.push(PageType.AtomCreate())
    },
  }

  const atomPopoverCreate = {
    close: (router: AppRouterInstance) => {
      router.push(PageType.Atoms())
    },
    open: (router: AppRouterInstance) => {
      router.push(PageType.AtomCreate())
    },
  }

  return {
    atomPopoverCreate,
    atomPopoverUpdate,
    create,
    getAll,
    getAllFromCache,
    getDataFn,
    getOne,
    getOneFromCache,
    getSelectAtomOptions,
    goToAtomsPage,
    goToDeleteAtomPage,
    loadApi,
    paginationService: atomPagination,
    removeMany,
    update,
  }
}
