import React from 'react'
import { uploadData } from './Upload.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Upload',
}

export const Default = () => {
  const Upload = Renderer.components(uploadData)

  return <Upload />
}
