import { useRecoilState } from 'recoil'
import { userState } from './state'

/** Returns the currentUser from local state */
export const useCurrentUser = () => {
  const [state] = useRecoilState(userState)

  return state.currentUser
}
