import { ValueObject } from '@codelab/backend'

export interface PageTitleProps {
  value: string
}

export class PageTitle extends ValueObject<PageTitleProps> {
  declare value: string
}
