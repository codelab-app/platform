/** Executes a get me query and stores the result in the @see {@link userState} */
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { userState } from './state'
import { User, useGetMeQuery } from '@codelab/generated'

export const useGetMe = (initialUser?: Partial<User>) => {
  const [, setState] = useRecoilState(userState)

  const query = useGetMeQuery()
  const { data, loading } = query

  useEffect(() => {
    setState((s) => ({ ...s, currentUser: initialUser }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!loading || !initialUser) {
      setState((s) => ({ ...s, currentUser: data?.getMe }))
    }
  }, [data, setState, loading, initialUser])

  return query
}
