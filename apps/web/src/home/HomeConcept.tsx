import { Typography } from 'antd'
import tw from 'twin.macro'

const { Text, Link, Title } = Typography

export const HomeConcept = () => {
  return (
    <div>
      <Title css={tw`text-center !font-extrabold`} level={2}>
        Control Your Data Pipeline
      </Title>
      Concept
    </div>
  )
}
