import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div.attrs((props) => ({
  className: classNames(
    'text-sm text-green-300 flex items-center',
    props.className,
  ),
}))``

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
