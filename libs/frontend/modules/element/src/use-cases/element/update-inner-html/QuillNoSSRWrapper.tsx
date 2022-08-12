import 'react-quill/dist/quill.snow.css'
import { Spin } from 'antd'
import dynamic from 'next/dynamic'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <Spin />,
})

export default QuillNoSSRWrapper
