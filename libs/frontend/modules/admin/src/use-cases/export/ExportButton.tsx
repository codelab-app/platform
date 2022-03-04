import { useGetAllTypesQuery } from '@codelab/frontend/modules/type'
import { Button } from 'antd'
import fileDownload from 'js-file-download'
import React from 'react'
import sanitizeFilename from 'sanitize-filename'

export const ExportButton = () => {
  // Tags data
  // const { data: tagsData } = useGetTagGraphsQuery()
  // const tags = tagsData?.tagGraphs ?? { vertices: [], edges: [] }

  // // All Types Data
  const { data: allData } = useGetAllTypesQuery()
  const allTypes = allData?.types ?? []

  // const typeIds = allTypes.map(el=>el.id)
  // const typesGraph = useExportAllTypesGraphQuery({variables: {input: {typeIds}}}, {
  //   selectFromResult: (r) => ({
  //     type: r
  //   }),
  // })

  // console.log(typesGraph)
  // // InterfaceTypesWithFields....
  // const { data: typesData } = useGetInterfaceTypesWithFieldsQuery()
  // const interfaceTypes = typesData?.types ?? []

  // const typeIds = allTypes.map((type: any) => type.id)

  // // Atoms Data
  // const { data: atomsData } = useGetAtomsQuery()
  // const atoms = atomsData?.atoms ?? []

  const exportData: any = {
    // tags,
    allTypes,
    // interfaceTypes,
    // atoms,
  }

  const onClickExport = () => {
    fileDownload(
      JSON.stringify(exportData),
      sanitizeFilename(`data.codelab.json`),
    )
  }

  return <Button onClick={onClickExport}>Export</Button>
}
