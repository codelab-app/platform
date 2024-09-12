import { Skeleton } from 'antd'

interface SkeletonWrapperProps {
  children?: React.ReactNode
  isLoading: boolean
}

export const SkeletonWrapper = ({
  children,
  isLoading,
}: SkeletonWrapperProps) =>
  isLoading ? (
    <Skeleton active loading style={{ padding: 5 }} />
  ) : (
    <>{children}</>
  )
