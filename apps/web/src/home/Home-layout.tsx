import React from 'react'
import { SharedPageProps } from '../../pages/_app'
import { HomeMenuHeader } from './Home-menu--header'
import {
  AppHeaderProps,
  AppLayout,
  AppLayoutProps,
} from '@codelab/modules/layout-stories'

export interface HomeLayoutProps extends SharedPageProps, AppLayoutProps {
  //
}

export const HomeLayout: React.FunctionComponent<any> = ({ children }) => {
  const header: AppHeaderProps = {
    Menu: <HomeMenuHeader />,
  }

  return <AppLayout header={header}>{children}</AppLayout>
}
