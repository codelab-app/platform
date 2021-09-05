import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload, UploadProps } from 'antd'
import { RcFile } from 'antd/lib/upload'
import { UploadProgressEvent } from 'rc-upload/es/interface'
import { useState } from 'react'
import { useImportAtomsMutation } from './ImportAtoms.api.graphql.gen'

export const ImportAtomsUpload = () => {
  const [importAtoms, { loading }] = useImportAtomsMutation()
  const [defaultFileList, setDefaultFileList] = useState([])
  const [progress, setProgress] = useState<UploadProgressEvent>()

  const props: UploadProps = {
    accept: '.json',
    beforeUpload: async (file) => {
      const text = await file.text()
      // file = { ...file, content: stringToBase64(text) }
    },
    customRequest: async (options) => {
      const { onSuccess, onError, file, onProgress } = options
      const text = await (file as RcFile).text()

      await importAtoms({
        variables: {
          input: {
            payload: text,
          },
        },
      })
    },
    onChange({ file, fileList }) {
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
