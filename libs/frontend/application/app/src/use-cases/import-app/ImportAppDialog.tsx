import ImportOutlined from '@ant-design/icons/ImportOutlined'
import type { IAppModel } from '@codelab/frontend/abstract/domain'
import {
  useErrorNotify,
  useSuccessNotify,
} from '@codelab/frontend/shared/utils'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import type { HttpException } from '@nestjs/common'
import { useAsync } from '@react-hookz/web'
import { Spin } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'

export const ImportAppDialog = observer(() => {
  const { appService } = useStore()
  const [{ status }, importApp] = useAsync(appService.importApp)

  const onError = useErrorNotify({
    description: (event: HttpException) => {
      return event.message
    },
    title: 'Failed to import app',
  })

  const onSuccess = useSuccessNotify({
    description: (event: Array<IAppModel>) => {
      return `App ${event[0]!.name} imported successfully`
    },
    title: 'App imported successfully',
  })

  const inputFile = useRef<HTMLInputElement | null>(null)
  const onClick = () => inputFile.current?.click()

  const onFileChange = async () => {
    const files = inputFile.current?.files
    const appDataFile = files?.[0]

    if (appDataFile) {
      await importApp.execute(appDataFile).then(onSuccess).catch(onError)
    }
  }

  return (
    <>
      {status === 'loading' && <Spin className="mr-2" />}
      <ImportOutlined onClick={onClick} />
      <input
        accept=".json"
        onChange={onFileChange}
        ref={inputFile}
        style={{ display: 'none' }}
        type="file"
      />
    </>
  )
})
