import { interfaceFormApi } from '@codelab/frontend/modules/type'
import { useMemo } from 'react'
import { useQuery } from 'react-query'

export const useResourceAtom = () => {
  const data = useQuery('resource-atom', () =>
    interfaceFormApi.InterfaceForm_GetAtomsWithApi({
      where: { name_CONTAINS: 'Resource' },
    }),
  )

  const resourceAtomByType = useMemo(() => {
    const result: Record<string, any> = {}
    data.data?.atoms?.forEach((a) => {
      result[a.type] = a
    })

    return result
  }, [data.data?.atoms])

  return { ...data, resourceAtomByType }
}
