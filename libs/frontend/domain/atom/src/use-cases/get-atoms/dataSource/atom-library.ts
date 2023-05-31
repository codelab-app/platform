import type { IAtomType } from '@codelab/shared/abstract/core'
import {
  antdAtoms,
  codelabAtoms,
  htmlAtoms,
  reactAtoms,
} from '@codelab/shared/config'
import { useCallback } from 'react'
import type { AtomLibrary } from '../columns'

export const useGetLibrary = () =>
  useCallback((atomType: IAtomType): AtomLibrary => {
    return htmlAtoms.includes(atomType)
      ? { color: 'orange', name: 'HTML' }
      : antdAtoms.includes(atomType)
      ? { color: 'geekblue', name: 'Ant Design' }
      : codelabAtoms.includes(atomType)
      ? { color: 'yellow', name: 'Codelab' }
      : reactAtoms.includes(atomType)
      ? { color: 'green', name: 'React' }
      : atomType === 'ExternalComponent'
      ? { color: 'brown', name: 'External' }
      : { color: 'black', name: 'Unknown' }
  }, [])
