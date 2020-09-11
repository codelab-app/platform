import React from 'react'
import { uploadData } from './Upload.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Upload',
}

export const Default = () => {
  const Upload = TreeDom.render(uploadData)

  return <Upload />
}
