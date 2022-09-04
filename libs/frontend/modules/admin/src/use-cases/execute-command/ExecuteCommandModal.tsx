import { notify } from '@codelab/frontend/shared/utils'
import { ModalForm } from '@codelab/frontend/view/components'
import {
  IAdminService,
  IExecuteCommandDTO,
} from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { AutoFields } from 'uniforms-antd'
import { executeCommandSchema } from './executeCommandSchema'

export const ExecuteCommandModal = observer(
  ({ adminService }: { adminService: IAdminService }) => {
    const onSuccess = (data: any) => {
      console.log(data)

      adminService.executeCommandModal.close()

      notify({
        type: 'success',
        title: 'Command Success',
      })

      setError({
        done: false,
        message: null,
      })
    }

    const onSubmit = async (data: IExecuteCommandDTO) => {
      const results = await adminService.executeCommand(data)

      if (!results.success) {
        throw results
      }

      return results
    }

    const [error, setError] = useState<{
      done: boolean
      message: string | null
    }>({
      done: false,
      message: null,
    })

    return (
      <ModalForm.Modal
        okText="Execute Command"
        onCancel={onSuccess}
        visible={adminService.executeCommandModal.isOpen}
      >
        <ModalForm.Form
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={(e) => {
            setError({
              done: true,
              message: e.data,
            })
          }}
          onSubmitSuccess={onSuccess}
          schema={executeCommandSchema}
        >
          <AutoFields />
        </ModalForm.Form>
        <>
          {error.done && (
            <SyntaxHighlighter language="javascript" style={materialDark}>
              {error.message ?? ''}
            </SyntaxHighlighter>
          )}
        </>
      </ModalForm.Modal>
    )
  },
)
