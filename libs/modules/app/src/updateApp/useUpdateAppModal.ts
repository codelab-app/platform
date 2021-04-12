import { useRecoilState } from 'recoil'
import { appState, AppType } from '../state'

export const useUpdateAppModal = () => {
  const [state, setAppState] = useRecoilState(appState)

  return {
    openEditAppModal: (editingApp: AppType) =>
      setAppState({ ...state, modalVisible: true, editingApp }),
  }
}
