import dynamic from 'next/dynamic'

export const DashboardTemplate = dynamic(() => import('./DashboardTemplate'), {
  ssr: false,
})
