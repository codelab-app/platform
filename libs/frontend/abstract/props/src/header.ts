import { IApp } from '@codelab/shared/abstract/core'

export interface HeaderProps {
  app?: Omit<IApp, 'ownerId'> | null
}
