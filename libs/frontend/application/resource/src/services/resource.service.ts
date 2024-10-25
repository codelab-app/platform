import type { IResourceService } from '@codelab/frontend/abstract/application'
import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import type {
  ICreateResourceData,
  IPropDto,
  IRef,
  IResourceDto,
  IUpdateResourceData,
} from '@codelab/shared/abstract/core'
import type { ResourceWhere } from '@codelab/shared/infra/gql'
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

import { PageType } from '@codelab/frontend/abstract/types'
import { resourceRepository } from '@codelab/frontend-domain-resource/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Validator } from '@codelab/shared/infra/schema'
import { v4 } from 'uuid'

export const useResourceService = (): IResourceService => {
  const { resourceDomainService } = useDomainStore()

  const create = async ({
    config: configData,
    id,
    name,
    type,
  }: ICreateResourceData) => {
    const configProps: IPropDto = {
      data: JSON.stringify(configData),
      id: v4(),
    }

    const resource = resourceDomainService.hydrate({
      config: configProps,
      id,
      name,
      type,
    })

    await resourceRepository.add(resource)

    return resource
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

  const update = async ({
    config: configData,
    id,
    name,
    type,
  }: IUpdateResourceData) => {
    const resource = resourceDomainService.resources.get(id)

    Validator.assertsDefined(resource)

    const config = resource.config

    config.writeCache({ data: JSON.stringify(configData) })
    resource.writeCache({ name, type })

    await resourceRepository.update(resource)

    return resource
  }

  const load = (resources: Array<IResourceDto>) => {
    resources.forEach((resource) => resourceDomainService.hydrate(resource))
  }

  const getOneFromCache = (ref: IRef) => {
    return resourceDomainService.resources.get(ref.id)
  }

  const getAllFromCache = () => {
    return Array.from(resourceDomainService.resources.values())
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
    getAllFromCache,
    getOne,
    getOneFromCache,
    getSelectResourceOptions,
    load,
    removeMany,
    update,
    updatePopover,
  }
}
