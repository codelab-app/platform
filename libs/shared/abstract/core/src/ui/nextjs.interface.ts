import { AppProps } from 'next/app'
import { Overwrite } from 'utility-types'
import { AccessTokenPayload } from '../domain/user'

export interface IPageProps {
  snapshot?: any
  user?: AccessTokenPayload
}

export type IAppProps = Overwrite<
  AppProps<any>,
  {
    pageProps: IPageProps
  }
>
