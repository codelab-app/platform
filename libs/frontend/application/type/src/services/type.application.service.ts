import type { ITypeService } from '@codelab/frontend/abstract/application'
import type {
  IFieldDomainService,
  ITypeDomainService,
  ITypeModel,
  ITypeRepository,
} from '@codelab/frontend/abstract/domain'
import { useDomainStore } from '@codelab/frontend-application-shared-store/provider'
import { ITypeKind } from '@codelab/shared/abstract/core'
import compact from 'lodash/compact'
import sortBy from 'lodash/sortBy'

export const useTypeService = () => {
  const { fieldDomainService, typeDomainService } = useDomainStore()

  /**
   * fetches the types with the given ids
   * while loading all their descendant types
   * @returns only the types having their id in ids
   */
  const getAll = async (ids?: Array<string>) => {
    const existingTypes = compact(
      ids?.map((id) => typeDomainService.types.get(id)) ?? [],
    )

    let newTypes: Array<ITypeModel> = []

    // Undefined `ids` should get to this point one time only
    // We also dont need to include types already in the cache
    if (ids?.length || !ids) {
      const { items: typeFragments } = await typeRepository.find({
        id_IN: ids,
      })

      const parentIds = typeFragments.map((typeFragment) => typeFragment.id)

      // load the descendants of the requested types
      // we don't need to get the descendants if all types are requested i.e. no `ids` provided
      const descendantTypeFragments = ids
        ? await this.typeRepository.findDescendants(parentIds)
        : []

      const newFragments = [...typeFragments, ...descendantTypeFragments]

      // don't include descendant types and return only requested types unless all is requested i.e. no `ids`
      newTypes = compact(
        newFragments.map((typeFragment) => {
          if (typeFragment.__typename === ITypeKind.InterfaceType) {
            typeFragment.fields.forEach((fieldFragment) => {
              fieldDomainService.hydrate(fieldFragment)
            })
          }

          const newType = this.typeDomainService.hydrate(typeFragment)

          return ids?.includes(typeFragment.id) || !ids ? newType : undefined
        }),
      )
    }

    const allTypes = [...existingTypes, ...newTypes]
    const result = sortBy(allTypes, ({ name }) => name.toLowerCase())

    return result
  }

  return {
    getAll,
  }
}
