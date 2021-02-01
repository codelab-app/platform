import { useRecoilState } from 'recoil'
import { appState } from '../state'

export const useCreateAppModal = () => {
  const [state, setAppState] = useRecoilState(appState)

  return {
    openCreateAppModal: () =>
      setAppState({ ...state, modalVisible: true, editingApp: undefined }),
  }
}
