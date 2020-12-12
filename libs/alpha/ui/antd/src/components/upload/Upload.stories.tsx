import React from 'react'
import { uploadData } from './Upload.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'Upload',
  parameters: {
    data: {
      Default: uploadData,
    },
  },
}

export const Default = () => {
  const Upload = Renderer.components(uploadData)

  return <Upload />
}
