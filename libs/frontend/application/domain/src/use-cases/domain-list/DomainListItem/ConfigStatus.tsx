import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined'
import WarningOutlined from '@ant-design/icons/WarningOutlined'
import classNames from 'classnames'
import styled from 'styled-components'

const Container = styled.div.attrs((props) => {
  return {
    className: classNames(
      'text-sm text-green-300 flex items-center',
      props.className,
    ),
  }
})``

export interface ConfigStatusProps {
  misconfigured?: boolean
}

export const ConfigStatus = ({ misconfigured }: ConfigStatusProps) => {
  if (!misconfigured) {
    return (
      <Container className="mt-2 text-green-400">
        <CheckCircleOutlined className="mr-1" />
        Valid Configuration
      </Container>
    )
  }

  return (
    <Container className="mt-2 text-red-400">
      <WarningOutlined className="mr-1" />
      Invalid Configuration
    </Container>
  )
}
