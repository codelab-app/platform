import React from 'react'
import { useRecoilValue } from 'recoil'
import { Spin } from 'antd'
import {
  loadIndicatorState,
  LoadingIndicatorState,
} from './loadingIndicatorState'
import { ExclamationCircleOutlined } from '@ant-design/icons'

interface LoadIndicatorProps {
  atomKey: string
  render?: (state: LoadingIndicatorState) => React.ReactElement
  renderErrored?: () => React.ReactElement
  renderLoading?: () => React.ReactElement
  renderNotLoading?: () => React.ReactElement
}

export const LoadingIndicator = ({
  atomKey,
  render,
  renderNotLoading,
  renderLoading,
  renderErrored,
}: LoadIndicatorProps) => {
  const state = useRecoilValue(loadIndicatorState(atomKey))

  if (render) {
    return render(state)
  }

  const { isLoading, isErrored } = state

  if (isErrored) {
    return renderErrored ? (
      renderErrored()
    ) : (
      <ExclamationCircleOutlined style={{ color: '#F43F5E' }} />
    )
  }

  if (isLoading) {
    return <Spin />
  }

  if (isLoading) {
    return renderLoading ? renderLoading() : <Spin />
  }

  return renderNotLoading ? renderNotLoading() : null
}
