import { AppProps } from 'next/app'
import { Overwrite } from 'utility-types'
import { IUserDTO } from '../domain/user'

export interface IPageProps {
  snapshot?: any
  user?: IUserDTO
}

export type IAppProps = Overwrite<
  AppProps<any>,
  {
    pageProps: IPageProps
  }
>
