import { useGetAllTypesQuery } from '@codelab/frontend/modules/type'
import { Button } from 'antd'
import React, { useMemo } from 'react'
import { ActionButton } from './ActionButton'

export const ExportButton = () => {
  // Tags data
  // const { data: tagsData } = useGetTagGraphsQuery()
  // const tags = tagsData?.tagGraphs ?? { vertices: [], edges: [] }

  // // All Types Data
  const { data: allData, isLoading } = useGetAllTypesQuery()
  const allTypes = allData?.types ?? []

  const typeIds = useMemo(() => {
    return allTypes.map((el) => el.id)
  }, [isLoading])

  // const {data: typeGraphRes} = useExportAllTypesGraphQuery({variables: {input: {typeIds}}}, {
  //   selectFromResult: (r) => ({
  //     data: r
  //   }),
  // })
  // const typesGraph = typeGraphRes.data?.exportAllTypesGraph

  // // InterfaceTypesWithFields....
  // const { data: typesData } = useGetInterfaceTypesWithFieldsQuery()
  // const interfaceTypes = typesData?.types ?? []

  // const typeIds = allTypes.map((type: any) => type.id)

  // // Atoms Data
  // const { data: atomsData } = useGetAtomsQuery()
  // const atoms = atomsData?.atoms ?? []

  return !isLoading ? (
    <ActionButton typeIds={typeIds} />
  ) : (
    <Button disabled={true}>Export</Button>
  )
}
