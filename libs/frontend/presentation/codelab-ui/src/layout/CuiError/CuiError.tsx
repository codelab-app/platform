'use client'

import { Button, Result } from 'antd'
import React from 'react'

export interface ErrorProps {
  error: Error
  reset(): void
}

export const CuiError = ({ error, reset }: ErrorProps) => {
  return (
    <Result
      extra={
        <Button onClick={reset} type="primary">
          Try again
        </Button>
      }
      status="error"
      subTitle={error.message}
      title="Sorry, something went wrong."
    />
  )
}
