import { ValueObject } from '@codelab/backend'

export interface AppTitleProps {
  value: string
}

export class AppTitle extends ValueObject<AppTitleProps> {
  declare value: string
}
