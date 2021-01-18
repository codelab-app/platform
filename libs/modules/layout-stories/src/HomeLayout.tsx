import { Layout } from 'antd'
import { useRouter } from 'next/router'
import { PropsWithChildren } from 'react'
import { AppLayoutProps } from './AppLayout'

const { Header, Footer, Sider, Content } = Layout

type HomeLayoutProps = AppLayoutProps

export const HomeLayout = (props: PropsWithChildren<HomeLayoutProps>) => {
  const router = useRouter()

  return null
  // return (
  //   <AppLayout sidebar={sidebar} header={header} footer={footer}>
  //     {children}
  //   </AppLayout>
  // )
}
