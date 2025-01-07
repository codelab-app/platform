import type { HttpException } from '@nestjs/common'

import ImportOutlined from '@ant-design/icons/ImportOutlined'
import {
  useErrorNotify,
  useSuccessNotify,
} from '@codelab/frontend/shared/utils'
import { useLoading } from '@codelab/frontend-application-shared-store/loading'
import { useRef } from 'react'

import { importComponentDataUseCase } from './import-component-data.use-case'

export const ImportComponentDialog = () => {
  const { setLoading } = useLoading()

  const onError = useErrorNotify({
    description: (event: HttpException) => event.message,
    title: 'Failed to import component',
  })

  const onSuccess = useSuccessNotify({
    description: '',
    title: 'Component imported successfully',
  })

  const inputFile = useRef<HTMLInputElement | null>(null)
  const onClick = () => inputFile.current?.click()

  const onFileChange = async () => {
    const files = inputFile.current?.files
    const componentDataFile = files?.[0]
    const formData = new FormData()

    if (componentDataFile) {
      setLoading(true)
      formData.append('file', componentDataFile)

      await importComponentDataUseCase(formData)
        .then(onSuccess)
        .catch(onError)
        .finally(() => setLoading(false))
    }
  }

  return (
    <>
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
}
