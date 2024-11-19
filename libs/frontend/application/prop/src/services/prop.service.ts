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

import { propRepository } from '@codelab/frontend-domain-prop/repositories'
import { mergeProps } from '@codelab/frontend-domain-prop/utils'
import { filterEmptyStrings } from '@codelab/shared/utils'

export const usePropService = (): IPropService => {
  const create = async (props: IPropCreateData) => {
    await propRepository.add(props)

    return props
  }

  const removeMany = async (props: Array<IRef>) => {
    return await propRepository.delete(props)
  }

  const reset = async (props: IPropDto) => {
    // props.writeCache({ data: '{}' })
    await update({ ...props, data: '{}' })

    return props
  }

  const update = async (dto: IPropUpdateData) => {
    await propRepository.update({ id: dto.id }, dto)

    return dto
  }

  const updateWithDefaultValuesApplied = async (
    props: IPropModel,
    { data, defaultValues, id }: IUpdatePropDataWithDefaultValues,
  ) => {
    const filteredData = filterEmptyStrings(data) as IPropData

    const mergedWithDefaultValues = mergeProps(
      defaultValues ?? {},
      filteredData,
    )

    props.writeCache({
      ...props.toJson,
      data: JSON.stringify(mergedWithDefaultValues),
      id,
    })

    return await update(props.toJson)
  }

  return {
    create,
    removeMany,
    reset,
    update,
    updateWithDefaultValuesApplied,
  }
}
