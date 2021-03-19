import { useUser } from '@auth0/nextjs-auth0'

export const useCurrentUser = () => {
  // const [state, setState] = useRecoilState(userState)
  // const { initialCheckDone } = state
  //
  // const [query, { data, loading }] = useGetMeLazyQuery()
  //
  // useEffect(() => {
  //   if (!initialCheckDone) {
  //     query()
  //     setState((s) => ({ ...s, initialCheckDone: true }))
  //   }
  // }, [initialCheckDone, query, setState])
  //
  // useEffect(() => {
  //   setState((s) => ({ ...s, currentUser: data?.getMe }))
  // }, [data, setState])

  const { user } = useUser()

  return user
}
