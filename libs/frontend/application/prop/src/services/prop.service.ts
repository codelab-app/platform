import type { IPropService } from '@codelab/frontend/abstract/application'
import type { IPropModel } from '@codelab/frontend/abstract/domain'
import type {
  IPropCreateData,
  IPropData,
  IPropDto,
  IPropUpdateData,
  IRef,
  IUpdatePropDataWithDefaultValues,
} from '@codelab/shared/abstract/core'
import type { NextFetchOptions } from '@codelab/shared/abstract/types'

import { propRepository } from '@codelab/frontend-domain-prop/repositories'
import { mergeProps } from '@codelab/frontend-domain-prop/utils'
import { CACHE_TAGS } from '@codelab/frontend-domain-shared'

export const usePropService = (): IPropService => {
  const create = async (props: IPropCreateData) => {
    await propRepository.add(props, {
      revalidateTags: [CACHE_TAGS.Prop.list()],
    })

    return props
  }

  const removeMany = async (props: Array<IRef>) => {
    return await propRepository.delete(props, {
      revalidateTags: [CACHE_TAGS.Prop.list()],
    })
  }

  const reset = async (props: IPropDto) => {
    // Can't revalidate here since we're calling it in `elementService.update`
    return await propRepository.update(
      { id: props.id },
      { ...props, data: '{}' },
    )
  }

  const update = async (dto: IPropUpdateData, options?: NextFetchOptions) => {
    await propRepository.update({ id: dto.id }, dto, {
      revalidateTags: options?.revalidateTags ?? [CACHE_TAGS.Prop.list()],
    })

    return dto
  }

  const updateWithDefaultValuesApplied = async (
    props: IPropModel,
    { data, defaultValues, id }: IUpdatePropDataWithDefaultValues,
  ) => {
    // does not look like we need to remove empty strings/arrays/objects from the properties,
    // since users should have ability to override property to whatever value they want
    // const filteredData = filterEmptyStrings(data) as IPropData
    const filteredData = data as IPropData

    const mergedWithDefaultValues = mergeProps(
      defaultValues ?? {},
      filteredData,
    )

    props.writeCache({
      ...props.toJson,
      data: JSON.stringify(mergedWithDefaultValues),
      id,
    })

    // do not revalidate here, we have already updated the cache above.
    // revalidating will cause pageBuilderQuery to be called again and this will
    // unmount and mount the entire components tree each time user updates element prop
    return await update(props.toJson, { revalidateTags: [] })
  }

  return {
    create,
    removeMany,
    reset,
    update,
    updateWithDefaultValuesApplied,
  }
}
