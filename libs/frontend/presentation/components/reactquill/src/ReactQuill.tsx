import { Spin } from 'antd'
import dynamic from 'next/dynamic'

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
