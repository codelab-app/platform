'use client'

import { Alert, Typography } from 'antd'

const { Text } = Typography

interface AppsSummaryProps {
  appsCount: number
  totalPages: number
}

export const AppsSummary = ({ appsCount, totalPages }: AppsSummaryProps) => {
  return (
    <Alert
      className="mb-8"
      message={
        <Text>
          Found <strong>{appsCount}</strong> app
          {appsCount !== 1 ? 's' : ''} with <strong>{totalPages}</strong> total
          page{totalPages !== 1 ? 's' : ''}
        </Text>
      }
      type="info"
    />
  )
}
