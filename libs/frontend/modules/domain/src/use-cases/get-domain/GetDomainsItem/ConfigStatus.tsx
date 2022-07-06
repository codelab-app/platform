import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons'
import styled from '@emotion/styled'
import tw from 'twin.macro'

const Container = styled.div`
  ${tw`text-sm text-green-300 flex items-center`}
`

export interface ConfigStatutsProps {
  misconfigured?: boolean
}

export const ConfigStatus = ({ misconfigured }: ConfigStatutsProps) => {
  if (!misconfigured) {
    return (
      <Container css={tw`text-green-400 mt-2 `}>
        <CheckCircleOutlined css={tw`mr-1`} />
        Valid Configuration
      </Container>
    )
  }

  return (
    <Container css={tw`text-red-400 mt-2`}>
      <WarningOutlined css={tw`mr-1`} />
      Invalid Configuration
    </Container>
  )
}
