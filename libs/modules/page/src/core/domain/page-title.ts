import { IsEmail } from 'class-validator'
import { ValueObject } from '@codelab/backend'

export interface PageTitleProps {
  value: string
}

export class PageTitle extends ValueObject<PageTitleProps> {
  @IsEmail(
    {},
    {
      message: 'Email must be valid',
    },
  )
  declare value: string
}
