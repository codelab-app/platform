import { AtomType } from '@codelab/shared/abstract/core'
import dynamic from 'next/dynamic'
import { AtomsRecord } from './atomFactoryType'

export const nextAtoms: AtomsRecord = {
  [AtomType.NextImage]: dynamic(() => import('next/image')),
}
