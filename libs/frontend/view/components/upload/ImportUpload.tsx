import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload, UploadProps } from 'antd'
import { RcFile } from 'antd/lib/upload'
import { UploadProgressEvent } from 'rc-upload/es/interface'
import { useState } from 'react'

export interface ImportUploadProps {
  fetchFn: (data: any) => Promise<any>
}

export const ImportUpload = ({ fetchFn }: ImportUploadProps) => {
  const [defaultFileList, setDefaultFileList] = useState([])
  const [progress, setProgress] = useState<UploadProgressEvent>()

  const props: UploadProps = {
    accept: '.json',
    beforeUpload: async (file: File) => {
      const text = await file.text()
      // file = { ...file, content: stringToBase64(text) }
    },
    customRequest: async (options) => {
      const { onSuccess, onError, file, onProgress } = options
      const text = await (file as RcFile).text()

      await fetchFn(text)
        .then(() => {
          if (onSuccess) {
            onSuccess({}, {} as any)
          }
        })
        .catch()
    },
    onChange({ file, fileList }) {
      console.log(file.status)

      if (file.status !== 'uploading') {
        console.log(file, fileList)
      }
    },
    defaultFileList: [],
  }

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  )
}
