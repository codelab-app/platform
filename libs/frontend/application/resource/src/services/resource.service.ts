import type { IResourceService } from '@codelab/frontend/abstract/application'
import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import type {
  ICreateResourceData,
  IPropDto,
  IResourceDto,
  IUpdateResourceData,
} from '@codelab/shared/abstract/core'
import type { ResourceWhere } from '@codelab/shared/infra/gqlgen'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { PageType } from '@codelab/frontend/abstract/types'
import { useHydrateStore } from '@codelab/frontend/infra/context'
import { resourceRepository } from '@codelab/frontend-domain-resource/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { v4 } from 'uuid'

export const useResourceService = (): IResourceService => {
  const { resourceDomainService } = useDomainStore()
  const hydrate = useHydrateStore()

  const create = async (data: ICreateResourceData) => {
    const config: IPropDto = {
      data: JSON.stringify(data.config),
      id: v4(),
    }

    const resource = { ...data, config }

    hydrate({ resourcesDto: [resource] })

    return await resourceRepository.add(resource)
  }

  const removeMany = async (resources: Array<IResourceModel>) => {
    resources.forEach((resource) => {
      resourceDomainService.resources.delete(resource.id)
    })

    return await resourceRepository.delete(resources)
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
    const resources = await getAll()

    return resources.map((resource) => ({
      label: resource.name,
      value: resource.id,
    }))
  }

  const update = async (data: IUpdateResourceData) => {
    // const resource = resourceDomainService.resources.get(id)

    // Validator.assertsDefined(resource)

    // config.writeCache({ data: JSON.stringify(configData) })
    // resource.writeCache({ name, type })

    return await resourceRepository.update(
      { id: data.id },
      {
        ...data,
        config: {
          data: JSON.stringify(data.config),
          id: v4(),
        },
      },
    )
  }

  const load = (resources: Array<IResourceDto>) => {
    resources.forEach((resource) => resourceDomainService.hydrate(resource))
  }

  const createPopover = {
    close: (router: AppRouterInstance) => {
      router.push(PageType.Resources())
    },
    open: (router: AppRouterInstance) => {
      router.push(PageType.ResourcesCreate())
    },
  }

  const updatePopover = {
    close: (router: AppRouterInstance) => {
      router.push(PageType.Resources())
    },
    open: (router: AppRouterInstance) => {
      router.push(PageType.Resources())
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
