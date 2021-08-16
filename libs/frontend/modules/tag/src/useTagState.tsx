import { useCallback, useEffect } from 'react'
import { atom, useRecoilState, useSetRecoilState } from 'recoil'

export interface UseTagTree {
  selectedTag?: string
  checkedTags: Array<string>
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
    (tag: string) => {
      setState((s) => ({ ...s, selectedTag: tag }))
    },
    [setState],
  )

  const setCheckedTags = useCallback(
    (tags: Array<string>) => {
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
