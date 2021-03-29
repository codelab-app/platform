import { atom } from 'recoil'

export interface PaneConfigState {
  vertexId?: string
}

export const paneConfigState = atom<PaneConfigState>({
  key: 'paneConfig',
  default: {
    // vertexId: null,
  },
})
