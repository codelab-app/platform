import { Spin } from 'antd'
import dynamic from 'next/dynamic'
import React from 'react'

export const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')

    return RQ
  },
  {
    loading: () => <Spin />,
    ssr: false,
  },
)
