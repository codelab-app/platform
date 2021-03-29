import { useRecoilState } from 'recoil'
import { AppType, appState } from '../state'

export const useEditAppModal = () => {
  const [state, setAppState] = useRecoilState(appState)

  return {
    openEditAppModal: (editingApp: AppType) =>
      setAppState({ ...state, modalVisible: true, editingApp }),
  }
}
