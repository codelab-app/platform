import { Button } from 'antd'
import fileDownload from 'js-file-download'
import React, { useState } from 'react'
import sanitizeFilename from 'sanitize-filename'
import { useExportAllTypesGraphQuery } from '../../graphql/Admin.endpoints.v2.graphql.gen'

interface ExportActionButtonProps {
  typeIds: Array<string>
}

export const ActionButton = (props: ExportActionButtonProps) => {
  const [typeIds, setTypeIds] = useState(props.typeIds)

  const { data, isLoading } = useExportAllTypesGraphQuery({
    variables: { input: { typeIds } },
  })

  const typesGraph = data?.exportAllTypesGraph
  console.log('type graph.......', typesGraph)

  const onClickExport = () => {
    const exportData: any = {
      // tags,
      typesGraph,
      // interfaceTypes,
      // atoms,
    }

    fileDownload(
      JSON.stringify(exportData),
      sanitizeFilename(`data.codelab.json`),
    )
  }

  return (
    <Button disabled={isLoading} onClick={onClickExport}>
      Export
    </Button>
  )
}
