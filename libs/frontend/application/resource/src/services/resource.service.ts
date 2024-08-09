import type { IResourceService } from '@codelab/frontend/abstract/application'
import type { IResourceModel } from '@codelab/frontend/abstract/domain'
import { resourceRepository } from '@codelab/frontend-domain-resource/repositories'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import type { ResourceWhere } from '@codelab/shared/infra/gql'
import type {
  ICreateResourceData,
  IPropDto,
  IResourceDto,
  IUpdateResourceData,
} from '@codelab/shared/abstract/core'
import { assertIsDefined } from '@codelab/shared/utils'
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

  const remove = async (resources: Array<IResourceModel>) => {
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
    getAll,
    getOne,
    getResource,
    getSelectResourceOptions,
    load,
    remove,
    update,
  }
}
