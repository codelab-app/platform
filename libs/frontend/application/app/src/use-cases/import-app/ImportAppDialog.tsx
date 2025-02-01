import type { IAppDto } from '@codelab/shared/abstract/core'
import type { HttpException } from '@nestjs/common'
import type { RefObject } from 'react'

import ImportOutlined from '@ant-design/icons/ImportOutlined'
import {
  useErrorNotify,
  useSuccessNotify,
} from '@codelab/frontend/shared/utils'

import { useImportApp } from './useImportApp.hook'

export const ImportAppDialog = (props: {
  inputRef: RefObject<HTMLInputElement>
}) => {
  const importApp = useImportApp()

  const onError = useErrorNotify({
    description: (event: HttpException) => {
      return event.message
    },
    title: 'Failed to import app',
  })

  const onSuccess = useSuccessNotify({
    description: (app?: IAppDto) => {
      return `App ${app?.name} imported successfully`
    },
    title: 'App imported successfully',
  })

  const onFileChange = async () => {
    const files = props.inputRef.current?.files
    const appDataFile = files?.[0]

    if (appDataFile) {
      await importApp(appDataFile).then(onSuccess).catch(onError)
    }
  }

  return (
    <>
      <ImportOutlined />
      <input
        accept=".json"
        onChange={onFileChange}
        ref={props.inputRef}
        style={{ display: 'none' }}
        type="file"
      />
    </>
  )
}
