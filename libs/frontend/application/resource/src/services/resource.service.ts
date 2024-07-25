import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import { resourceRepository } from '@codelab/frontend-domain-resource/repositories'
import type { ResourceWhere } from '@codelab/shared/abstract/codegen'
import type {
  ICreateResourceData,
  IPropDto,
  IResourceDto,
  IUpdateResourceData,
} from '@codelab/shared/abstract/core'
import { assertIsDefined } from '@codelab/shared/utils'
import { v4 } from 'uuid'

export const useResourceService = () => {
  const { resourceDomainService } = useDomainStore()

  const getResourceList = () => {
    return [...resourceDomainService.resources.values()]
  }

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

  const deleteResources = async (resources: Array<IResourceModel>) => {
    resources.forEach((resource) => {
      resourceDomainService.resources.delete(resource.id)
    })

    await resourceRepository.delete(resources)
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

    assertIsDefined(resource)

    const config = resource.config

    config.writeCache({ data: JSON.stringify(configData) })
    resource.writeCache({ name, type })

    await resourceRepository.update(resource)

    return resource
  }

  const load = (resources: Array<IResourceDto>) => {
    resources.forEach((resource) => resourceDomainService.hydrate(resource))
  }

  const getResource = (id: string) => {
    return resourceDomainService.resources.get(id)
  }

  return {
    create,
    deleteResources,
    getAll,
    getOne,
    getResource,
    getResourceList,
    getSelectResourceOptions,
    load,
    update,
  }
}
