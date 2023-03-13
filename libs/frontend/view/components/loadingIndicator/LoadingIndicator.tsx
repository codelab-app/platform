import { ExclamationCircleOutlined } from '@ant-design/icons'
import Spin from 'antd/lib/spin'
import isFunction from 'lodash/isFunction'
import type { CSSProperties } from 'react'
import React from 'react'
import type { LoadingData } from './useTrackLoadingPromises'

interface LoadIndicatorProps extends LoadingData {
  renderErrored?: (error: unknown) => React.ReactElement
  renderLoading?: () => React.ReactElement
  renderNotLoading?: () => React.ReactElement
  style?: CSSProperties | ((state: LoadingData) => CSSProperties)
}

export const LoadingIndicator = ({
  error,
  isLoading,
  renderErrored,
  renderLoading,
  renderNotLoading,
  style: styleProp,
}: LoadIndicatorProps) => {
  const elementStyle = isFunction(styleProp)
    ? styleProp({ error, isLoading })
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
