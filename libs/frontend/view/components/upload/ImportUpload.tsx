import { UploadOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { Button, Upload } from 'antd'
import type { RcFile } from 'antd/lib/upload'
import type { UploadProgressEvent } from 'rc-upload/es/interface'
import React, { useState } from 'react'

export interface ImportUploadProps {
  fetchFn: (data: unknown) => Promise<unknown>
}

export const ImportUpload = ({ fetchFn }: ImportUploadProps) => {
  const [defaultFileList, setDefaultFileList] = useState([])
  const [progress, setProgress] = useState<UploadProgressEvent>()
  const [isLoading, setIsLoading] = useState(false)

  const props: UploadProps = {
    accept: '.json',
    beforeUpload: async (file: File) => {
      const text = await file.text()
      // file = { ...file, content: stringToBase64(text) }
    },
    customRequest: async (options) => {
      setIsLoading(true)

      const { onSuccess, onError, file, onProgress } = options
      const text = await (file as RcFile).text()

      await fetchFn(text)
        .then(() => {
          if (onSuccess) {
            onSuccess({}, {} as XMLHttpRequest)
          }
        })
        .catch()
        .finally(() => {
          setIsLoading(false)
        })
    },
    onChange: ({ file, fileList }) => {
      console.info(file.status)

      if (file.status !== 'uploading') {
        console.info(file, fileList)
      }
    },
    defaultFileList: [],
    showUploadList: false,
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Upload {...props}>
      <Button icon={<UploadOutlined />} loading={isLoading}>
        Import
      </Button>
    </Upload>
  )
}
