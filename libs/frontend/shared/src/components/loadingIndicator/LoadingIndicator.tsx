import React, { CSSProperties } from 'react'
import { useRecoilValue } from 'recoil'
import { Spin } from 'antd'
import {
  loadIndicatorState,
  LoadingIndicatorState,
} from './loadingIndicatorState'
import { ExclamationCircleOutlined } from '@ant-design/icons'

interface StatelessLoadIndicatorProps {
  state: LoadingIndicatorState
  render?: (state: LoadingIndicatorState) => React.ReactElement
  renderErrored?: () => React.ReactElement
  renderLoading?: () => React.ReactElement
  renderNotLoading?: () => React.ReactElement
  style?: CSSProperties | ((state: LoadingIndicatorState) => CSSProperties)
}

interface LoadIndicatorProps
  extends Omit<StatelessLoadIndicatorProps, 'state'> {
  recoilKey: string
}

export const StatelessLoadingIndicator = ({
  state,
  render,
  renderNotLoading,
  renderLoading,
  renderErrored,
  style: styleProp,
}: StatelessLoadIndicatorProps) => {
  if (render) {
    return render(state)
  }

  const { isLoading, isErrored } = state

  const elementStyle =
    typeof styleProp === 'function' ? styleProp(state) : styleProp || {}

  if (isErrored) {
    return renderErrored ? (
      renderErrored()
    ) : (
      <ExclamationCircleOutlined
        size={14}
        style={{ color: '#F43F5E', ...elementStyle }}
      />
    )
  }

  if (isLoading) {
    return renderLoading ? (
      renderLoading()
    ) : (
      <Spin size="small" style={elementStyle} />
    )
  }

  return renderNotLoading ? renderNotLoading() : null
}

export const LoadingIndicator = ({
  recoilKey,
  ...props
}: LoadIndicatorProps) => {
  const state = useRecoilValue(loadIndicatorState(recoilKey))

  return <StatelessLoadingIndicator state={state} {...props} />
}
