'use client'

import type { IAtomService } from '@codelab/frontend/abstract/application'
import type { AtomOptions, AtomWhere } from '@codelab/shared/infra/gqlgen'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { RoutePaths } from '@codelab/frontend/abstract/application'
import {
  type IAtomModel,
  type ICreateAtomData,
  type IUpdateAtomData,
} from '@codelab/frontend/abstract/domain'
import { useDomainStoreHydrator } from '@codelab/frontend/infra/context'
import { useTypeService } from '@codelab/frontend-application-type/services'
import { atomRepository } from '@codelab/frontend-domain-atom/repositories'
import {
  filterAtoms,
  mapEntitySelectOptions,
} from '@codelab/frontend-domain-atom/store'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { typeRepository } from '@codelab/frontend-domain-type/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { type IRef, ITypeKind } from '@codelab/shared/abstract/core'
import { Validator } from '@codelab/shared/infra/typebox'
import { atomApi } from '@codelab/shared-domain-module/atom'
import queryString from 'query-string'
import { isEmpty } from 'remeda'
import { v4 } from 'uuid'

export const useAtomService = (): IAtomService => {
  const { atomDomainService, userDomainService } = useDomainStore()
  const user = userDomainService.user
  const owner = { id: user.id }
  const typeService = useTypeService()
  const hydrate = useDomainStoreHydrator()

  const create = async (data: ICreateAtomData) => {
    const api = await typeRepository.add({
      __typename: ITypeKind.InterfaceType,
      fields: [],
      id: v4(),
      kind: ITypeKind.InterfaceType,
      name: `${data.name} API`,
      owner,
    })

    const atomDto = {
      ...data,
      __typename: 'Atom',
      api,
      owner,
    } as const

    /**
     * Hydrating just the atom would leave the aggregate in an inconsistent state.
     *
     * For example, `AtomsTreeView` requires `api.fieldsTree` to display related fields of the atom. Using `atom.api.current` breaks the app, while using `atom.api.maybeCurrent` is enough.
     */
    // hydrate({ atomsDto: [atomDto] })

    const atom = await atomRepository.add(atomDto, {
      revalidateTags: [CACHE_TAGS.Atom.list()],
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

    return await atomRepository.delete(atomsToDelete, {
      revalidateTags: [CACHE_TAGS.Atom.list()],
    })
  }

  const getAll = async (where?: AtomWhere, options?: AtomOptions) => {
    const {
      aggregate: { count },
      items: atoms,
    } = await atomRepository.find(where, options)

    if (!isEmpty(where ?? {}) || options?.limit) {
      hydrate({
        fieldsDto: atoms.flatMap((atom) => atom.api.fields),
        tagsDto: atoms.flatMap((atom) => atom.tags),
        typesDto: atoms.map((atom) => atom.api),
      })
    }

    return atoms.map((atom) => atomDomainService.hydrate(atom))
  }

  const getOne = async (id: string) => {
    const all = await getAll({ id })

    return all[0]
  }

  const getSelectAtomOptions = async (parent?: IAtomModel) => {
    const { atoms } = await atomApi().GetSelectAtomOptions({})
    const atomOptions = filterAtoms(atoms, parent)

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

    await atomRepository.update({ id }, data, {
      revalidateTags: [CACHE_TAGS.Atom.list()],
    })

    Validator.assertsDefined(atom)

    return atom
  }

  const goToAtomsPage = (router: AppRouterInstance) => {
    router.push(RoutePaths.Atom.base())
  }

  const goToDeleteAtomPage = (ref: IRef, router: AppRouterInstance) => {
    router.push(RoutePaths.Atom.delete(ref))
  }

  const updatePopover = {
    close: (router: AppRouterInstance) => {
      const searchParams = new URLSearchParams(window.location.search)

      searchParams.delete('node')

      const url = queryString.stringifyUrl({
        query: Object.fromEntries(searchParams.entries()),
        url: RoutePaths.Atom.base(),
      })

      router.push(url)
    },
    open: (router: AppRouterInstance) => {
      router.push(RoutePaths.Atom.create())
    },
  }

  const createPopover = {
    close: (router: AppRouterInstance) => {
      router.push(RoutePaths.Atom.base())
    },
    open: (router: AppRouterInstance) => {
      router.push(RoutePaths.Atom.create())
    },
  }

  return {
    create,
    createPopover,
    getAll,
    getOne,
    getSelectAtomOptions,
    goToAtomsPage,
    goToDeleteAtomPage,
    loadApi,
    removeMany,
    update,
    updatePopover,
  }
}
