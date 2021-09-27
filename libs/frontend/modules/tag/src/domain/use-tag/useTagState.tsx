import { Key, useCallback, useEffect } from 'react'
import { atom, useRecoilState, useSetRecoilState } from 'recoil'

export interface UseTagTree {
  selectedTag?: Key
  checkedTags: Array<Key>
}

const defaultState = {
  selectedTag: undefined,
  checkedTags: [],
}

const tagTreeState = atom<UseTagTree>({
  key: 'tagTreeState',
  default: defaultState,
})

export const useSetTagState = () => {
  const setState = useSetRecoilState(tagTreeState)

  const setSelectedTag = useCallback(
    (tag: Key) => {
      console.log(tag)
      setState((s) => ({ ...s, selectedTag: tag }))
    },
    [setState],
  )

  const setCheckedTags = useCallback(
    (tags: Array<Key>) => {
      setState((s) => ({ ...s, checkedTags: tags }))
    },
    [setState],
  )

  useEffect(() => {
    return () => setState({ ...defaultState })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { setSelectedTag, setCheckedTags }
}

export const useTagState = () => {
  const [state] = useRecoilState(tagTreeState)
  const setters = useSetTagState()

  return {
    ...setters,
    ...state,
  }
}
