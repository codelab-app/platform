import dynamic from 'next/dynamic'

export const DynamicDashboardTemplate = dynamic(
  () => import('./DashboardTemplate'),
  {
    ssr: false,
  },
)

export * from './constants'
export * from './DashboardTemplate'
export * from './Types'
