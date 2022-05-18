import { useQuery } from 'react-query'
import { interfaceFormApi } from '../store'

export const useGetAllComponents = () => {
  const { data, isLoading, error } = useQuery(
    'interface-form/select-component',
    () =>
      interfaceFormApi.InterfaceForm_GetComponents({
        where: { name_NOT_CONTAINS: 'Hook' },
      }),
  )

  const options =
    data?.components.map((c) => ({
      label: c.name,
      value: c.id,
    })) ?? []

  return { data, options, isLoading, error }
}
