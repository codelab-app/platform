import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from './state'
import { useGetMeLazyQuery } from '@codelab/generated'

/**
 * Returns the currentUser from local state.
 * If the user data is not yet queried from the backend, does the query
 * */
export const useCurrentUser = () => {
  const [state, setState] = useRecoilState(userState)
  const { initialCheckDone } = state

  const [query, { data, loading }] = useGetMeLazyQuery()

  useEffect(() => {
    if (!initialCheckDone) {
      query()
      setState((s) => ({ ...s, initialCheckDone: true }))
    }
  }, [initialCheckDone, query, setState])

  useEffect(() => {
    setState((s) => ({ ...s, currentUser: data?.getMe }))
  }, [data, setState])

  return state.currentUser
}
