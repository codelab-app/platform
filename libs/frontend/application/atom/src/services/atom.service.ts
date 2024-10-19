'use client'

import type {
  GetDataFn,
  IAtomService,
} from '@codelab/frontend/abstract/application'
import type { AtomOptions, AtomWhere } from '@codelab/shared/infra/gql'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import {
  atomRef,
  type IAtomModel,
  type ICreateAtomData,
  type IUpdateAtomData,
} from '@codelab/frontend/abstract/domain'
import { PageType } from '@codelab/frontend/abstract/types'
import { graphqlFilterMatches } from '@codelab/frontend-application-shared-store/pagination'
import { useTypeService } from '@codelab/frontend-application-type/services'
import {
  AtomMapper,
  atomRepository,
} from '@codelab/frontend-domain-atom/repositories'
import {
  filterAtoms,
  mapEntitySelectOptions,
} from '@codelab/frontend-domain-atom/store'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import {
  IElementRenderTypeKind,
  type IRef,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { Validator } from '@codelab/shared/infra/schema'
import { untracked } from 'mobx'
import { untrackedStart } from 'mobx/dist/internal'
import { runUnprotected } from 'mobx-keystone'
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

  const typeService = useTypeService()
  const atomMapper = new AtomMapper(userDomainService.user)

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
    const input = atomMapper.toCreateInput(data)
    const atom = await atomRepository.add(input)

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

    const input = atomMapper.toDeleteInput()

    return await atomRepository.delete(atomsToDelete, input)
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
    if (atomDomainService.atoms.has(id)) {
      return atomDomainService.atoms.get(id)
    }

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

  const update = async (data: IUpdateAtomData) => {
    const atom = await atomRepository.update({
      update: atomMapper.toUpdateInput(data),
      where: { id: data.id },
    })

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
      router.push(`${PageType.Atoms()}${window.location.search}`)
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
