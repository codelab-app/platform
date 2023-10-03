import { AntDesignOutlined, Html5Outlined } from '@ant-design/icons'
import type { IAtomType } from '@codelab/shared/abstract/core'
import {
  antdAtoms,
  codelabAtoms,
  htmlAtoms,
  reactAtoms,
} from '@codelab/shared/config'
import React, { useCallback } from 'react'
import type { AtomLibrary } from '../columns'

export const useGetLibrary = () =>
  useCallback((atomType: IAtomType): AtomLibrary => {
    return htmlAtoms.includes(atomType)
      ? {
          color: 'orange',
          icon: React.createElement(Html5Outlined),
          name: 'HTML',
        }
      : antdAtoms.includes(atomType)
      ? {
          color: 'geekblue',
          icon: React.createElement(AntDesignOutlined),
          name: 'Ant Design',
        }
      : codelabAtoms.includes(atomType)
      ? { color: 'yellow', name: 'Codelab' }
      : reactAtoms.includes(atomType)
      ? { color: 'green', name: 'React' }
      : atomType === 'ExternalComponent'
      ? { color: 'brown', name: 'External' }
      : { color: 'black', name: 'Unknown' }
  }, [])
