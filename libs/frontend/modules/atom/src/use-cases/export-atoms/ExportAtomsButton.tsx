import { useExportAtomsLazyQuery } from '@codelab/shared/codegen/graphql'
import { Button } from 'antd'
import React from 'react'

type ExportAtomsButtonProps = {
  atomIds: Array<string>
}

export const ExportAtomsButton = ({ atomIds }: ExportAtomsButtonProps) => {
  const [exportData, { loading, data }] = useExportAtomsLazyQuery()

  if (data?.getAtoms) {
    console.log(data?.getAtoms)
  }

  return (
    <Button
      onClick={() =>
        exportData({
          variables: {
            input: {
              where: {
                ids: atomIds,
              },
            },
          },
        })
      }
    >
      Export
    </Button>
  )
}
