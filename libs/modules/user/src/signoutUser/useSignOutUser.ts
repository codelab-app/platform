import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import { userState } from '../state'
import { Page, clearAuthToken, notify } from '@codelab/frontend/shared'

export const useSignOutUser = () => {
  const [, setState] = useRecoilState(userState)
  const router = useRouter()

  const signOut = () => {
    clearAuthToken()

    setState((s) => ({ ...s, currentUser: undefined }))

    notify({
      type: 'info',
      title: 'You have been signed out',
    })

    router.push(Page.HOME.url)
  }

  return { signOut }
}
