import { Key, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectTag, tagActions, TagState } from '../../store/tagState'

export interface UseTagState {
  selectedTag: TagState['selectedTag']
  checkedTags: TagState['checkedTags']
  setSelectedTag: (key: Key) => void
  setCheckedTags: (keys: Array<Key>) => void
}

export const useTagState = (): UseTagState => {
  const { selectedTag, checkedTags } = useSelector(selectTag)
  const dispatch = useDispatch()

  const setSelectedTag = useCallback(
    (key: Key) => dispatch(tagActions.selectTag({ key })),
    [dispatch],
  )

  const setCheckedTags = useCallback(
    (keys: Array<Key>) => dispatch(tagActions.setCheckedTags({ keys })),
    [dispatch],
  )

  useEffect(() => {
    return () => {
      dispatch(tagActions.resetSelection())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    setSelectedTag,
    setCheckedTags,
    checkedTags,
    selectedTag,
  }
}
