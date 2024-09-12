import type { IPropService } from '@codelab/frontend/abstract/application'
import type { IPropModel } from '@codelab/frontend/abstract/domain'
import { propRepository } from '@codelab/frontend-domain-prop/repositories'
import { mergeProps } from '@codelab/frontend-domain-prop/utils'
import type {
  IPropData,
  IUpdatePropData,
  IUpdatePropDataWithDefaultValues,
} from '@codelab/shared/abstract/core'
import { filterEmptyStrings } from '@codelab/shared/utils'

export const usePropService = (): IPropService => {
  const create = async (props: IPropModel) => {
    await propRepository.add(props)

    return props
  }

  const deleteProp = async (props: Array<IPropModel>) => {
    await propRepository.delete(props)
  }

  const reset = async (props: IPropModel) => {
    props.writeCache({ data: '{}' })
    await propRepository.update(props)

    return props
  }

  const update = async (props: IPropModel, data: IUpdatePropData) => {
    props.writeCache(data)
    await propRepository.update(props)

    return props
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

    return await update(props, {
      data: JSON.stringify(mergedWithDefaultValues),
      id,
    })
  }

  return {
    create,
    delete: deleteProp,
    reset,
    update,
    updateWithDefaultValuesApplied,
  }
}
