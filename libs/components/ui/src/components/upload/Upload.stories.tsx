import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { uploadData } from './Upload.data'

export default {
  title: 'Upload',
}

export const Default = () => {
  const Upload = TreeDom.render(uploadData)

  return <Upload />
}
