import { AtomType } from '@codelab/shared/abstract/core'
import dynamic from 'next/dynamic'
import { AtomsRecord } from './atomFactoryType'

// Custom atom components
export const codelabAtoms: AtomsRecord = {
  [AtomType.Query]: dynamic(
    () =>
      import('@codelab/frontend/view/components').then(
        (mod) => mod.Query,
      ) as any,
  ),
  [AtomType.TextList]: dynamic(
    () =>
      import('@codelab/frontend/view/components').then(
        (mod) => mod.TextList,
      ) as any,
  ),
  [AtomType.Text]: dynamic(
    () =>
      import('@codelab/frontend/view/components').then(
        (mod) => mod.Text,
      ) as any,
  ),
  [AtomType.State]: dynamic(
    () =>
      import('@codelab/frontend/view/components').then(
        (mod) => mod.State,
      ) as any,
  ),
}
