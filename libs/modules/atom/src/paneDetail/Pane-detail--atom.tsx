import React from 'react'
import { AtomContainerCreate } from '../Atom-container--create'
import { AtomContainerUpdateDelete } from '../Atom-container--updateDelete'
import { useAtom } from '../useAtom'

export const AtomDetailPane = () => {
  const { detailAtomId } = useAtom()

  return (
    <>
      {detailAtomId ? <AtomContainerUpdateDelete /> : <AtomContainerCreate />}
    </>
  )
}
