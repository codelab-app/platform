// import 'react-quill/dist/quill.snow.css'
import { Spin } from 'antd'
import dynamic from 'next/dynamic'

const QuillNoSSRWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill')
    const Quill = RQ.Quill

    Quill.register(Quill.import('attributors/style/align'), true)
    Quill.register(Quill.import('attributors/style/background'), true)
    Quill.register(Quill.import('attributors/style/color'), true)
    Quill.register(Quill.import('attributors/style/direction'), true)
    Quill.register(Quill.import('attributors/style/font'), true)

    return RQ
  },
  {
    ssr: false,
    loading: () => <Spin />,
  },
)

export default QuillNoSSRWrapper
