import { Spin } from 'antd'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')

    return RQ
  },
  {
    ssr: false,
    loading: () => <Spin />,
  },
)

export default ReactQuill
