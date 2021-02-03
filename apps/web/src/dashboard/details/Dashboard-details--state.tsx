import { atom } from 'recoil'

interface DashboardDetailsState {
  action: CrudAction | undefined
  pageId: string | undefined
}

export type CrudAction = 'create' | 'update'

export const dashboardDetailsState = atom<DashboardDetailsState>({
  key: 'dashboardDetails',
  default: {
    action: undefined,
    pageId: undefined,
  },
})
