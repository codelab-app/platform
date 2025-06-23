import type { IResourceService } from '@codelab/frontend-abstract-application'
import type { IResourceModel } from '@codelab/frontend-abstract-domain'
import type {
  ICreateResourceData,
  IPropDto,
  IResourceDto,
  IUpdateResourceData,
} from '@codelab/shared-abstract-core'
import type { ResourceWhere } from '@codelab/shared-infra-gqlgen'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { RoutePaths } from '@codelab/frontend-abstract-application'
import { resourceRepository } from '@codelab/frontend-domain-resource/repositories'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { resourceApi } from '@codelab/shared-domain-module-resource'
import { Validator } from '@codelab/shared-infra-typebox'
import { v4 } from 'uuid'

export const useResourceService = (): IResourceService => {
  const { resourceDomainService } = useDomainStore()

  const create = async (data: ICreateResourceData) => {
    const config: IPropDto = {
      data: JSON.stringify(data.config),
      id: v4(),
    }

    const resource = { ...data, config }

    resourceDomainService.hydrate(resource)

    return await resourceRepository.add(resource, {
      revalidateTags: [CACHE_TAGS.Resource.list()],
    })
  }

  const removeMany = async (resources: Array<IResourceModel>) => {
    resources.forEach((resource) => {
      resourceDomainService.resources.delete(resource.id)
    })

    return await resourceRepository.delete(resources, {
      revalidateTags: [CACHE_TAGS.Resource.list()],
    })
  }

  const getAll = async (where: ResourceWhere = {}) => {
    const { items: resources } = await resourceRepository.find(where)

    return resources.map((resource) => resourceDomainService.hydrate(resource))
  }

  const getOne = async (id: string) => {
    const [resource] = await getAll({ id })

    return resource
  }

  const getSelectResourceOptions = async () => {
    /**
     * Don't use server action, otherwise will re-render the entire route segment!
     */
    const { items: resources } = await resourceApi().ResourceList({})

    return resources
      .map((resource) => resourceDomainService.hydrate(resource))
      .map((resource) => ({
        label: resource.name,
        value: resource.id,
      }))
  }

  const update = async ({ config, id, name, type }: IUpdateResourceData) => {
    const resource = resourceDomainService.resources.get(id)

    Validator.assertsDefined(resource)

    resource.writeCache({ name, type })
    resource.config.writeCache({ data: JSON.stringify(config) })

    return await resourceRepository.update({ id }, resource.toJson, {
      revalidateTags: [CACHE_TAGS.Resource.list()],
    })
  }

  const load = (resources: Array<IResourceDto>) => {
    resources.forEach((resource) => resourceDomainService.hydrate(resource))
  }

  const createPopover = {
    close: (router: AppRouterInstance) => {
      router.push(RoutePaths.Resource.base())
    },
    open: (router: AppRouterInstance) => {
      router.push(RoutePaths.Resource.create())
    },
  }

  const updatePopover = {
    close: (router: AppRouterInstance) => {
      router.push(RoutePaths.Resource.base())
    },
    open: (router: AppRouterInstance) => {
      router.push(RoutePaths.Resource.base())
    },
  }

  return {
    create,
    createPopover,
    getAll,
    getOne,
    getSelectResourceOptions,
    load,
    removeMany,
    update,
    updatePopover,
  }
}
