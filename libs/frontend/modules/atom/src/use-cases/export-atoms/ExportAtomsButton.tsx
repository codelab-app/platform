import { useExportAtomsMutation } from '@codelab/shared/codegen/graphql'
import { Button } from 'antd'
import React from 'react'

type ExportAtomsButtonProps = {
  atomIds: Array<string>
}

export const ExportAtomsButton = ({ atomIds }: ExportAtomsButtonProps) => {
  const [exportData] = useExportAtomsMutation()

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
