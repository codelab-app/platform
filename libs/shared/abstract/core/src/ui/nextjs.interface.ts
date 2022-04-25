import { AppProps } from 'next/app'
import { Overwrite } from 'utility-types'
import { JwtPayload } from '../domain/user'

export interface IPageProps {
  snapshot?: any
  user?: JwtPayload
}

export type IAppProps = Overwrite<
  AppProps<any>,
  {
    pageProps: IPageProps
  }
>
