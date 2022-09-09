import { ExclamationCircleOutlined } from '@ant-design/icons'
import Spin from 'antd/lib/spin'
import { isFunction } from 'lodash'
import React, { CSSProperties } from 'react'
import { LoadingData } from './useTrackLoadingPromises'

interface LoadIndicatorProps extends LoadingData {
  renderErrored?: (error: any) => React.ReactElement
  renderLoading?: () => React.ReactElement
  renderNotLoading?: () => React.ReactElement
  style?: CSSProperties | ((state: LoadingData) => CSSProperties)
}

export const LoadingIndicator = ({
  isLoading,
  error,
  renderNotLoading,
  renderLoading,
  renderErrored,
  style: styleProp,
}: LoadIndicatorProps) => {
  const elementStyle = isFunction(styleProp)
    ? styleProp({ isLoading: loading, error })
    : styleProp || {}

  if (error) {
    return renderErrored ? (
      renderErrored(error)
    ) : (
      <ExclamationCircleOutlined
        size={16}
        style={{ color: '#F43F5E', ...elementStyle }}
      />
    )
  }

  if (isLoading) {
    return renderLoading ? renderLoading() : <Spin style={elementStyle} />
  }

  return renderNotLoading ? renderNotLoading() : null
}
