import { atom } from 'recoil'

export interface PaneConfigState {
  pageElementId?: string
}

export const paneConfigState = atom<PaneConfigState>({
  key: 'paneConfig',
  default: {
    pageElementId: undefined,
  },
})
